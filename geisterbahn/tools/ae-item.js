// AliExpress-PRODUKTDETAILSEITEN auslesen: Regulaerpreis, Verkaeufer, Versand,
// Variantenpreise. Braucht eine Wohnanschluss-IP – aus einem Rechenzentrum
// landet jeder Aufruf auf /_____tmd_____/punish (siehe HANDOVER-LOKAL.md).
//
//   node ae-item.js 1005007059778300 32966619156 ...
//   node ae-item.js --variants 1005009580843710      # klickt alle SKU-Optionen durch
//   node ae-item.js --select "IP30,30LEDs-M,5m" 1005009580843710   # eine Kombination
//   node ae-item.js --qty 10 1005007059651484        # Deal-Grenze vs. Lagerbestand
//   node ae-item.js --file ids.txt
//
// Ausgabe: Konsole + $OUTFILE (Default /tmp/ae-items.json)
//
// Anders als in der Cloud-Session dokumentiert existiert window.runParams auf der
// aktuellen Seitenversion nicht mehr – deshalb DOM-Extraktion. Die Klassennamen
// sind gehasht (z. B. store-detail--storeName--Lk2FVZ4), aber die Praefixe sind
// stabil, daher [class*="..."].
//
// WICHTIG: Ohne Login zeigt AliExpress den Neukunden-Willkommenspreis (oft
// CHF 0.92, 1 Stueck pro Kunde). Der durchgestrichene Preis daneben ist der
// echte Regulaerpreis – genau der wird hier als priceRegular ausgelesen.

const { chromium } = require('playwright');
const fs = require('fs');

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36';

const COOKIES = [
  { name: 'aep_usuc_f', value: 'site=deu&c_tp=CHF&region=CH&b_locale=de_DE', domain: '.aliexpress.com', path: '/' },
  { name: 'xman_us_f', value: 'x_l=0&x_locale=de_DE&region=CH&b_locale=de_DE', domain: '.aliexpress.com', path: '/' },
  { name: 'intl_locale', value: 'de_DE', domain: '.aliexpress.com', path: '/' },
];

// Liest den Preisblock. Die Klassennamen sind gehasht, die Praefixe stabil:
//   price-default--current--*    angezeigter Preis (ohne Login oft der Neukundenpreis)
//   price-default--original--*   durchgestrichener Regulaerpreis
//   price-default--ladderWrap--* Mengenstaffel ("ab 5 Stk ...")
// NICHT den ganzen Body nehmen: dort steht auch "CHF 2.00 Rabatt auf CHF 15.00",
// was den Regulaerpreis faelschlich auf 15 hochzieht.
const readPrice = () => {
  const num = s => [...String(s).matchAll(/CHF\s?([\d'’.,]+)/g)]
    .map(m => parseFloat(m[1].replace(/['’]/g, '').replace(',', '.')));
  const g = sel => { const e = document.querySelector(sel); return e ? e.innerText.trim() : ''; };
  const cur = g('[class*="price-default--current"]');
  const orig = g('[class*="price-default--original"]');
  const wrap = g('[class*="price-default--priceWrap"]') || g('[class*="price-default--wrap"]');
  const ladder = g('[class*="price-default--ladderWrap"]');
  const shown = num(cur)[0];
  const regular = num(orig)[0];
  return {
    priceText: (wrap || cur + ' | ' + orig).replace(/\s*\n\s*/g, ' | ').slice(0, 200),
    shown, regular,
    ladder: ladder ? ladder.replace(/\s*\n\s*/g, ' | ').slice(0, 160) : undefined,
    newcomerDeal: /Neueinkäufer|Neukunden|Welcome deal|New user/i.test(wrap),
  };
};

async function scrape(p, id, opts) {
  const url = `https://de.aliexpress.com/item/${id}.html`;
  // Bis zu 3 Versuche. Wichtig: nicht nur bei goto-Fehlern wiederholen, sondern
  // auch wenn die Seite zwar laedt, der Preisblock aber leer bleibt. Genau das
  // passiert in Serienlaeufen und sieht sonst aus wie "Angebot existiert nicht".
  let landed;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await p.waitForTimeout((opts.wait || 8000) + (attempt - 1) * 5000);
      landed = p.url();
      if (/_____tmd_____|punish|captcha/i.test(landed)) return { url, error: 'BOT-SCHUTZ', landed };
      const ok = await p.evaluate(() => !!document.querySelector('[class*="price-default--current"]'));
      if (ok) break;
    } catch (e) { if (attempt === 3) throw e; }
    if (attempt < 3) await p.waitForTimeout(4000 * attempt);
  }

  const base = await p.evaluate((readPriceSrc) => {
    const readPrice = eval('(' + readPriceSrc + ')');
    const txt = e => e ? e.innerText.trim().replace(/\s*\n\s*/g, ' / ') : undefined;
    const storeLink = document.querySelector('a[href*="/store/"]');
    const head = document.body.innerText.slice(0, 800);
    const mOrders = head.match(/([\d'’.]+\+?)\s*verkauft/i);
    const mStars = head.match(/\n\s*([\d.]+)\s*\n[\s\S]{0,40}?Bewertungen/i) || head.match(/([\d.]+)\s+\d+\s+Bewertungen/i);

    return {
      title: txt(document.querySelector('h1')) || document.title,
      seller: txt(document.querySelector('[class*="store-detail--storeName"]'))
           || (storeLink ? storeLink.innerText.trim().replace(/^Verkauft von\s*/i, '').replace(/\s*\(Händler\)\s*$/i, '').replace(/\n/g, ' ') : undefined),
      storeUrl: storeLink ? 'https:' + storeLink.getAttribute('href').replace(/^https?:/, '') : undefined,
      storeInfo: txt(document.querySelector('[class*="store-detail--businessInfoWrap"], [class*="store-info--desc"]')),
      orders: mOrders ? mOrders[1] + ' verkauft' : undefined,
      stars: mStars ? mStars[1] : undefined,
      shipping: [...document.querySelectorAll('[class*="dynamic-shipping"], [class*="shipping--content"]')]
        .map(e => e.innerText.trim().replace(/\s*\n\s*/g, ' / ')).filter(Boolean).slice(0, 3),
      // Lagerbestand: "Nur 3 übrig" killt eine Position, die 10x gebraucht wird.
      // "Maximal bis zu 1 Stück pro Kunde" ist dagegen die Neukunden-Deal-Grenze.
      stock: (document.body.innerText.match(/Nur\s+(\d+)\s+übrig/i) || [])[0],
      maxPerCustomer: (document.body.innerText.match(/Maximal bis zu\s+(\d+)\s+Stück pro Kunde/i) || [])[0],
      quantityArea: (() => {
        const e = document.querySelector('[class*="quantity--"]');
        return e ? e.innerText.trim().replace(/\s*\n\s*/g, ' / ').slice(0, 120) : undefined;
      })(),
      // Variantengruppen: jede [class*="sku-item--property"] ist eine Dimension
      // (z. B. "Länge", "Farbe"), die Optionen sind div[data-sku-col] mit einem
      // title-Attribut. Ein Angebot kann mehrere Dimensionen haben – beim
      // WS2812B drei (PCB/IP-Klasse, LED-Dichte, Laenge).
      variantGroups: [...document.querySelectorAll('[class*="sku-item--property"]')].map(w => ({
        name: (txt(w.querySelector('[class*="sku-item--title"]')) || '').split(':')[0].trim(),
        selected: (w.querySelector('[class*="sku-item--selected"]') || {}).title,
        // Label steht entweder im title-Attribut (Text-Kacheln) oder im alt des
        // Bildes (Bild-Kacheln, class sku-item--image). Ohne den alt-Fallback
        // bleiben Bild-Varianten komplett unsichtbar – z. B. "5pcs / 10pcs".
        options: [...w.querySelectorAll('[data-sku-col]')]
          .map(o => (o.getAttribute('title') || (o.querySelector('img') || {}).alt || o.innerText || '').trim())
          .filter(Boolean).slice(0, 60),
      })),
      ...readPrice(),
    };
  }, readPrice.toString());

  const rec = { url, ...base };
  rec.priceShown = base.shown;
  // Ohne durchgestrichenen Preis ist der angezeigte Preis der regulaere.
  rec.priceRegular = base.regular != null ? base.regular : base.shown;

  if (opts.select) rec.selected = await selectVariants(p, opts.select);
  if (opts.qty) rec.qtyTest = await testQty(p, opts.qty);
  if (opts.variants) rec.variantPrices = await clickVariants(p);
  return rec;
}

// Setzt die Menge und liest, was die Seite daraufhin sagt. Trennt zwei Dinge,
// die von aussen gleich aussehen:
//   "Maximal bis zu 1 Stück pro Kunde"  -> Grenze des Neukunden-Deals
//   "Nur N übrig"                       -> echter Lagerbestand
// Ausserdem faellt beim Hochsetzen der Neukundenpreis weg, sodass der Preis
// erscheint, den eine Bestellung ueber 10 Stueck wirklich kostet.
async function testQty(p, qty) {
  const inp = await p.$('input.comet-v2-input-number-input');
  if (!inp) return { error: 'kein Mengenfeld' };
  await inp.click({ clickCount: 3 }).catch(() => {});
  await inp.fill(String(qty)).catch(() => {});
  await inp.press('Tab').catch(() => {});
  await p.waitForTimeout(2500);
  return await p.evaluate(() => {
    const g = s => { const e = document.querySelector(s); return e ? e.innerText.trim().replace(/\s*\n\s*/g, ' | ') : undefined; };
    const inc = document.querySelector('.comet-v2-input-number-btn-increase');
    return {
      accepted: (document.querySelector('input.comet-v2-input-number-input') || {}).value,
      info: g('[class*="quantity--info"]'),
      increaseBlocked: inc ? inc.className.includes('disabled') : undefined,
      priceAfter: g('[class*="price-default--priceWrap"]') || g('[class*="price-default--current"]'),
    };
  });
}

// Zweiter Riegel gegen den Baxia-Dialog: falls er trotz geblocktem Request
// erscheint, hier rauswerfen. Dazu die ueblichen Coupon-/Cookie-Layer.
async function killOverlays(p) {
  await p.evaluate(() => {
    // Zwei Traeger desselben Captchas: div.baxia-dialog und der Wrapper
    // .J_MIDDLEWARE_FRAME_WIDGET. Beide sind praktisch unsichtbar und liegen
    // ueber der ganzen Seite. Ausgeloest werden sie u. a. von der API
    // mtop.aliexpress.pdp.pc.adjust, die beim Variantenwechsel feuert und mit
    // FAIL_SYS_USER_VALIDATE antwortet. Der Preis im DOM stimmt trotzdem –
    // die Seite rechnet ihn lokal –, nur die Folgeklicks waeren blockiert.
    document.querySelectorAll('.baxia-dialog, [id*="baxia"], [class*="baxia"], .J_MIDDLEWARE_FRAME_WIDGET')
      .forEach(e => e.remove());
    document.querySelectorAll('[class*="pop-layer"], [class*="coupon-modal"], [class*="_1WMYa"]')
      .forEach(e => { if (e.getBoundingClientRect().width > 600) e.remove(); });
  }).catch(() => {});
}

// Liest nach dem aktuellen Klickzustand Preis, Versand und Bestand.
async function readState(p) {
  const pr = await p.evaluate((src) => eval('(' + src + ')')(), readPrice.toString());
  const extra = await p.evaluate(() => {
    const e = document.querySelector('[class*="dynamic-shipping"], [class*="shipping--content"]');
    return {
      shipping: e ? e.innerText.trim().replace(/\s*\n\s*/g, ' / ').slice(0, 90) : undefined,
      stock: (document.body.innerText.match(/Nur\s+\d+\s+übrig/i) || [])[0],
      // "Maximal bis zu 1 Stück pro Kunde" verraet, dass der angezeigte Preis
      // noch der Neukunden-Deal ist – sonst ist er der echte Aktionspreis.
      maxPerCustomer: (document.body.innerText.match(/Maximal bis zu\s+\d+\s+Stück pro Kunde/i) || [])[0],
      selected: [...document.querySelectorAll('[class*="sku-item--selected"]')]
        .map(x => (x.getAttribute('title') || (x.querySelector('img') || {}).alt || '').trim()).filter(Boolean),
    };
  });
  return { shown: pr.shown, regular: pr.regular, newcomerDeal: pr.newcomerDeal, ladder: pr.ladder, ...extra };
}

// Waehlt gezielt Varianten per Titel-Teiltreffer und liest dann den Preis.
// Nötig, weil ein Angebot mehrere Dimensionen hat: beim WS2812B ergibt erst
// die Kombination IP30 + 30LEDs-M + 5m den Preis, der in die Liste gehoert.
// --select "IP30,30LEDs-M,5m"  klickt der Reihe nach diese drei Optionen.
async function selectVariants(p, wanted) {
  const log = [];
  for (const want of wanted) {
    const needle = want.trim().toLowerCase();
    // Handles nach jedem Klick neu holen – die Optionsliste rendert neu.
    let handle = null, title = null;
    for (const h of await p.$$('[data-sku-col]')) {
      const t = await h.evaluate(e => (e.getAttribute('title') || (e.querySelector('img') || {}).alt || e.innerText || '').trim());
      if (t && t.toLowerCase().includes(needle)) { handle = h; title = t; break; }
    }
    if (!handle) { log.push({ want, hit: 'nicht gefunden' }); continue; }
    if (await handle.evaluate(e => e.className.includes('sku-item--selected'))) {
      log.push({ want, hit: title + ' (war schon gewaehlt)' });
      continue;
    }
    // sku-item--soldOut: diese Kombination gibt es nicht mehr. Der Klick laeuft
    // dann in einen Timeout – ohne diese Pruefung sieht das nach einem
    // Werkzeugfehler aus, obwohl die Variante schlicht ausverkauft ist.
    if (await handle.evaluate(e => e.className.includes('sku-item--soldOut'))) {
      log.push({ want, hit: title, error: 'AUSVERKAUFT in dieser Kombination' });
      continue;
    }
    // scrollIntoView ist NICHT optional: ohne es liegt die Option ausserhalb des
    // Viewports und Playwright meldet "nicht klickbar" – das sah in der ersten
    // Fassung nach einem Selektorproblem aus, war aber nur die Scrollposition.
    await killOverlays(p);
    await handle.evaluate(e => e.scrollIntoView({ block: 'center' })).catch(() => {});
    await p.waitForTimeout(600);
    let how = 'click', why;
    try { await handle.click({ timeout: 5000 }); }
    catch (e) {
      why = e.message.split('\n').find(l => /intercept|not stable|not visible|outside|disabled/i.test(l))
         || e.message.split('\n')[0];
      try { await handle.click({ timeout: 4000, force: true }); how = 'force'; }
      catch { await handle.evaluate(e => e.click()).catch(() => {}); how = 'dom'; }
    }
    await p.waitForTimeout(2200);
    const ok = await p.evaluate(t => [...document.querySelectorAll('[class*="sku-item--selected"]')]
      .some(e => (e.getAttribute('title') || (e.querySelector('img') || {}).alt || '').trim() === t), title);
    log.push({ want, hit: title, how, ...(ok ? {} : { error: 'Klick ohne Wirkung' }) });
  }
  return { picked: log, state: await readState(p) };
}

// Klickt jede Option jeder Variantengruppe einzeln an und liest den Preis.
// Nur sinnvoll bei eindimensionalen Angeboten (z. B. "1pc / 5pcs / 10pcs").
async function clickVariants(p) {
  const groups = await p.$$('[class*="sku-item--property"]');
  const out = [];
  for (let g = 0; g < groups.length; g++) {
    const name = await groups[g].$eval('[class*="sku-item--title"]', e => e.innerText.trim().split(':')[0]).catch(() => `Gruppe ${g + 1}`);
    const rows = [];
    const n = (await groups[g].$$('[data-sku-col]')).length;
    for (let i = 0; i < Math.min(n, 30); i++) {
      // Handles jedes Mal neu holen: nach einem Klick rendert die Liste neu.
      await killOverlays(p);
      const opts = await (await p.$$('[class*="sku-item--property"]'))[g].$$('[data-sku-col]');
      if (!opts[i]) break;
      const label = await opts[i].evaluate(e =>
        (e.getAttribute('title') || (e.querySelector('img') || {}).alt || e.innerText || '').trim()).catch(() => '');
      if (await opts[i].evaluate(e => e.className.includes('sku-item--soldOut'))) {
        rows.push({ label, price: 'AUSVERKAUFT' });
        continue;
      }
      try {
        await opts[i].click({ timeout: 4000 });
        await p.waitForTimeout(1500);
      } catch { rows.push({ label, price: 'nicht klickbar' }); continue; }
      rows.push({ label, ...(await readState(p)) });
    }
    out.push({ name, options: rows });
  }
  return out;
}

async function run(ids, opts) {
  const b = await chromium.launch();
  // Hohes Fenster: bei 1200 px verdeckt die klebende Kopfzeile die mittig
  // gescrollte Variantenoption, der Klick laeuft dann in einen Timeout.
  const ctx = await b.newContext({ locale: 'de-CH', userAgent: UA, viewport: { width: 1600, height: 1400 }, timezoneId: 'Europe/Zurich' });
  await ctx.addCookies(COOKIES);
  // Bilder nur blockieren, wenn nicht geklickt wird: mit blockierten Bildern
  // bleibt die Variantenauswahl bei manchen Angeboten wirkungslos (der Klick
  // wirft nicht, aber die Auswahl aendert sich nicht).
  const block = opts.select || opts.variants ? ['font', 'media'] : ['image', 'font', 'media'];
  const newPage = async () => {
    const p = await ctx.newPage();
    await p.route('**/*', r => {
      // Der Empfehlungs-Endpoint loest den Baxia-Bot-Schutz aus. Der legt dann ein
      // unsichtbares Overlay (div.baxia-dialog mit _____tmd_____/punish-iframe)
      // ueber die ganze Seite, das jeden Variantenklick abfaengt – Playwright
      // meldet nur "Timeout", nicht "Captcha". Wir brauchen die Empfehlungen
      // nicht, also gar nicht laden.
      //
      // ABER: die Hauptnavigation nie abbrechen. Wird die Seite selbst auf
      // /_____tmd_____/punish umgeleitet, ist das die harte IP-Sperre, und die muss
      // sichtbar bleiben. Bricht man sie ab, bleibt p.url() die Originaladresse,
      // die BOT-SCHUTZ-Erkennung greift nicht und der Datensatz kommt einfach leer
      // zurueck – das sah eine ganze Session lang nach Drosselung aus.
      const isNav = r.request().isNavigationRequest() && r.request().frame() === p.mainFrame();
      if (!isNav && /relationrecommend|_____tmd_____|baxia/i.test(r.request().url())) return r.abort();
      return block.includes(r.request().resourceType()) ? r.abort() : r.continue();
    });
    return p;
  };

  const out = {};
  let first = true;
  for (const id of ids) {
    // Frische Seite und Pause pro Position: in Serienlaeufen liefert dieselbe
    // Seite ab der zweiten Position leere Preisbloecke – sieht aus wie "Angebot
    // existiert nicht", ist aber Drosselung.
    if (!first) await new Promise(r => setTimeout(r, opts.pause || 25000));
    first = false;
    const p = await newPage();
    try {
      const rec = await scrape(p, id, opts);
      out[id] = rec;
      if (rec.error) { console.log(`### ${id}  ${rec.error} -> ${String(rec.landed).slice(0, 80)}`); continue; }
      console.log(`\n### ${id}  ${String(rec.title).slice(0, 78)}`);
      console.log(`    Verkaeufer : ${rec.seller}   ${rec.storeUrl || ''}`);
      console.log(`    Preis      : angezeigt ${rec.priceShown}  regulaer ${rec.priceRegular}` +
                  `${rec.newcomerDeal ? '   [NEUKUNDEN-DEAL aktiv]' : ''}`);
      console.log(`    Preisblock : ${rec.priceText}`);
      if (rec.ladder) console.log(`    Staffel    : ${rec.ladder}`);
      console.log(`    Versand    : ${(rec.shipping || []).join('  ||  ') || '—'}`);
      console.log(`    Bewertung  : ${rec.stars}★  ${rec.orders || ''}`);
      if (rec.stock || rec.maxPerCustomer) console.log(`    BESTAND    : ${rec.stock || ''} ${rec.maxPerCustomer || ''}`);
      if (rec.qtyTest) console.log(`    Mengentest : akzeptiert ${rec.qtyTest.accepted}  gesperrt=${rec.qtyTest.increaseBlocked}` +
                                   `  "${rec.qtyTest.info || ''}"  Preis danach: ${rec.qtyTest.priceAfter}`);
      (rec.variantGroups || []).forEach(v => console.log(`    Variante   : ${v.name} -> ${v.options.slice(0, 12).join(' / ')}`));
      if (rec.selected) {
        console.log(`    >>> GEWAEHLT: ${rec.selected.picked.map(x => `${x.want}=${x.hit}${x.how ? '(' + x.how + ')' : ''}${x.error ? ' [' + x.error + ']' : ''}`).join('  |  ')}`);
        const s = rec.selected.state;
        console.log(`    >>> PREIS   : angezeigt ${s.shown}  regulaer ${s.regular ?? s.shown}` +
                    `${s.newcomerDeal ? ' [NEUKUNDEN-DEAL]' : ''}  Versand: ${s.shipping || '—'}` +
                    `  ${s.stock || ''} ${s.maxPerCustomer || ''}`);
        if (s.ladder) console.log(`    >>> Staffel : ${s.ladder}`);
        console.log(`    >>> Auswahl : ${(s.selected || []).join(' / ')}`);
      }
      (rec.variantPrices || []).forEach(v => {
        console.log(`    --- Variantenpreise: ${v.name}`);
        v.options.forEach(o => console.log(`        ${String(o.label).replace(/\n/g, ' ').padEnd(30)} angezeigt ${String(o.shown ?? o.price).padEnd(7)} regulaer ${String(o.regular ?? '').padEnd(7)} ${o.newcomerDeal ? '(Neukunde)' : ''} ${o.shipping || ''}`));
      });
    } catch (e) {
      out[id] = { error: e.message.slice(0, 200) };
      console.log(`### ${id} ERR ${e.message.slice(0, 140)}`);
    } finally {
      await p.close().catch(() => {});
    }
  }
  await b.close();
  const f = process.env.OUTFILE || '/tmp/ae-items.json';
  fs.writeFileSync(f, JSON.stringify(out, null, 1));
  console.log(`\n-> ${f}`);
}

let args = process.argv.slice(2);
const qi = args.indexOf('--qty');
const si = args.indexOf('--select');
const pi = args.indexOf('--pause');
const opts = {
  pause: pi >= 0 ? parseInt(args[pi + 1], 10) * 1000 : 0,
  variants: args.includes('--variants'),
  qty: qi >= 0 ? parseInt(args[qi + 1], 10) : 0,
  // --select "IP30,30LEDs-M,5m" -> gezielte Variantenkombination
  select: si >= 0 ? args[si + 1].split(',').map(s => s.trim()).filter(Boolean) : null,
};
// Von hinten splicen, sonst verschieben sich die Indizes gegenseitig.
[qi, si, pi].filter(i => i >= 0).sort((a, b) => b - a).forEach(i => args.splice(i, 2));
args = args.filter(a => a !== '--variants');
if (args[0] === '--file') args = fs.readFileSync(args[1], 'utf8').split(/\s+/).filter(Boolean);
run(args, opts);
