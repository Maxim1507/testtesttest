// Shopinterne Suche bei einem AliExpress-Verkaeufer. Damit prueft man, wie viel
// einer Einkaufsliste ein einzelner Haendler abdeckt – die Grundlage fuers
// Buendeln auf wenige Pakete.
//
//   node ae-store.js <storeId> "suchbegriff" "noch einer" ...
//   node ae-store.js 1103077704 "esp32 38pin" breakout
//   node ae-store.js <storeId> --list liste.json     # {"label": {"q": "...", "keys": ["..."]}}
//
// Ausgabe: Konsole + $OUTFILE (Default /tmp/ae-store.json)
//
// ⚠️ WICHTIGSTE FALLE: Findet die shopinterne Suche nichts, liefert sie NICHT
// null Treffer, sondern faellt auf das gesamte Sortiment zurueck. "20 Treffer"
// bedeutet also nichts. Ohne Relevanzpruefung gegen den Titel haelt man einen
// Haendler faelschlich fuer einen Volllieferanten. Deshalb "keys": nur Treffer,
// deren Titel eines der Stichwoerter enthaelt, zaehlen als Treffer.
//
// Die funktionierende URL ist  /store/<id>/search?SearchText=<q>  – sie leitet
// intern auf /store/<id>/pages/all-items.html um. Die Variante
// /store/<id>/search/<q>.html liefert 404.
//
// Achtung: Ohne Login steht in den Karten der Neukunden-Willkommenspreis
// (CHF 0.92) und dahinter der Regulaerpreis. Dieses Tool gibt beide aus;
// verlassen sollte man sich nur auf den zweiten (bzw. auf ae-item.js).

const { chromium } = require('playwright');
const fs = require('fs');

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36';

async function run(storeId, tasks) {
  const b = await chromium.launch();
  const ctx = await b.newContext({ locale: 'de-CH', userAgent: UA, viewport: { width: 1600, height: 1200 }, timezoneId: 'Europe/Zurich' });
  await ctx.addCookies([
    { name: 'aep_usuc_f', value: 'site=deu&c_tp=CHF&region=CH&b_locale=de_DE', domain: '.aliexpress.com', path: '/' },
    { name: 'xman_us_f', value: 'x_l=0&x_locale=de_DE&region=CH&b_locale=de_DE', domain: '.aliexpress.com', path: '/' },
    { name: 'intl_locale', value: 'de_DE', domain: '.aliexpress.com', path: '/' },
  ]);
  const p = await ctx.newPage();
  await p.route('**/*', r => ['image', 'font', 'media'].includes(r.request().resourceType()) ? r.abort() : r.continue());

  const out = {};
  let nRelevant = 0;
  for (const [label, task] of Object.entries(tasks)) {
    const q = task.q;
    const keys = (task.keys && task.keys.length ? task.keys : [q]).map(s => s.toLowerCase());
    const url = `https://de.aliexpress.com/store/${storeId}/search?SearchText=${encodeURIComponent(q)}`;
    try {
      // Retry: bei laengeren Laeufen kommen ERR_NETWORK_CHANGED und Timeouts vor.
      // Ohne Wiederholung sieht eine Position dann faelschlich nach "fuehrt der
      // Haendler nicht" aus – der teuerste Irrtum in dieser Auswertung.
      let lastErr;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
          lastErr = null;
          break;
        } catch (e) { lastErr = e; await p.waitForTimeout(3000 * attempt); }
      }
      if (lastErr) throw lastErr;
      await p.waitForTimeout(7000);
      await p.mouse.wheel(0, 2500);
      await p.waitForTimeout(2500);

      const items = await p.evaluate(() => {
        const res = [], seen = new Set();
        document.querySelectorAll('a[href*="/item/"]').forEach(a => {
          const m = a.href.match(/\/item\/(\d+)\.html/);
          if (!m || seen.has(m[1])) return;
          const card = a.closest('div[class*="card"]') || a.closest('div[class*="item"]') || a;
          // Die Karten zerhacken Preise in Einzelspans ("CHF | 0 | . | 92").
          // Erst zusammenkleben, dann lesbar machen.
          let t = (card.innerText || '').replace(/\s*\n\s*/g, ' | ').trim();
          t = t.replace(/CHF\s*\|\s*([\d]+)\s*\|\s*\.\s*\|\s*(\d+)/g, 'CHF $1.$2');
          if (t.length < 15) return;
          seen.add(m[1]);
          const prices = [...t.matchAll(/CHF\s?([\d'’.,]+)/g)].map(x => parseFloat(x[1].replace(/['’]/g, '').replace(',', '.')));
          const sold = (t.match(/([\d'’.]+\+?)\s*verkauft/) || [])[1];
          res.push({ id: m[1], prices, sold, text: t.slice(0, 200) });
        });
        return res.slice(0, 20);
      });

      const hits = items.filter(i => keys.some(k => i.text.toLowerCase().includes(k)));
      if (hits.length) nRelevant++;
      out[label] = { query: q, keys, url, hits, nRaw: items.length };
      console.log(`\n${hits.length ? 'JA  ' : '--  '}${label.padEnd(24)} ${hits.length} relevant / ${items.length} rohe Treffer  ("${q}")`);
      hits.slice(0, 4).forEach(i => console.log(`      ${i.id}  ${JSON.stringify(i.prices)}  ${i.sold || '?'}\n        ${i.text.slice(0, 130)}`));
    } catch (e) {
      out[label] = { query: q, url, error: e.message.slice(0, 200) };
      console.log(`--  ${label.padEnd(24)} ERR ${e.message.slice(0, 100)}`);
    }
  }
  console.log(`\n===== Store ${storeId}: ${nRelevant} von ${Object.keys(tasks).length} Positionen abgedeckt =====`);
  await b.close();
  const f = process.env.OUTFILE || '/tmp/ae-store.json';
  fs.writeFileSync(f, JSON.stringify({ storeId, covered: nRelevant, total: Object.keys(tasks).length, out }, null, 1));
  console.log(`-> ${f}`);
}

const [storeId, ...rest] = process.argv.slice(2);
if (!storeId || !rest.length) {
  console.error('Aufruf: node ae-store.js <storeId> "suchbegriff" ...  |  node ae-store.js <storeId> --list liste.json');
  process.exit(1);
}
const tasks = rest[0] === '--list'
  ? JSON.parse(fs.readFileSync(rest[1], 'utf8'))
  : Object.fromEntries(rest.map(q => [q, { q }]));
run(storeId, tasks);
