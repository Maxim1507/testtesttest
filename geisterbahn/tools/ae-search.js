// AliExpress-Trefferlisten auslesen. Funktionierte am 18.09.2026 auch aus einem
// Rechenzentrum heraus (im Gegensatz zu den Produktdetailseiten).
//
//   node ae-search.js queries.json
//
// queries.json:  { "esp32": "ESP32 DevKit 38 Pin", "relais": "relay module 5V" }
// Ausgabe:       Konsole + $OUTFILE (Default /tmp/ae-out.json)
//
// LOKAL: executablePath entfernen oder anpassen. In der Remote-Session war der
// vorinstallierte Browser eine andere Version als das npm-Paket, deshalb der
// feste Pfad. Lokal genuegt `npx playwright install chromium`.

const { chromium } = require('playwright');
const fs = require('fs');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36';
const CHROME = process.env.CHROME_PATH || undefined;

async function run(queries) {
  const b = await chromium.launch({
    executablePath: CHROME,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  const ctx = await b.newContext({
    locale: 'de-CH', userAgent: UA, viewport: { width: 1440, height: 900 },
    timezoneId: 'Europe/Zurich',
  });

  // Diese Cookies erzwingen CHF als Waehrung und die Schweiz als Lieferland.
  // Ohne sie kommen die Preise in USD und ohne CH-Versandfilter.
  await ctx.addCookies([
    { name: 'aep_usuc_f', value: 'site=deu&c_tp=CHF&region=CH&b_locale=de_DE', domain: '.aliexpress.com', path: '/' },
    { name: 'xman_us_f', value: 'x_l=0&x_locale=de_DE&region=CH&b_locale=de_DE', domain: '.aliexpress.com', path: '/' },
    { name: 'intl_locale', value: 'de_DE', domain: '.aliexpress.com', path: '/' },
  ]);

  const p = await ctx.newPage();
  // Bilder/Fonts blocken: schneller, und die Trefferliste rendert trotzdem.
  await p.route('**/*', r => ['image', 'font', 'media'].includes(r.request().resourceType()) ? r.abort() : r.continue());

  const out = {};
  for (const [key, q] of Object.entries(queries)) {
    // sortType=total_tranpro_desc = nach Bestellungen sortieren, nicht nach Preis.
    const url = `https://de.aliexpress.com/w/wholesale-${encodeURIComponent(q)}.html?sortType=total_tranpro_desc&shipCountry=CH`;
    try {
      await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await p.waitForTimeout(5500);
      await p.mouse.wheel(0, 2000);      // Lazy-Loading anstossen
      await p.waitForTimeout(2500);

      const items = await p.evaluate(() => {
        const res = [], seen = new Set();
        document.querySelectorAll('a[href*="/item/"]').forEach(a => {
          const m = a.href.match(/\/item\/(\d+)\.html/);
          if (!m || seen.has(m[1])) return;
          const card = a.closest('div[class*="search-item-card-wrapper"]') || a;
          const t = (card.innerText || '').replace(/\s*\n\s*/g, ' | ').trim();
          if (t.length < 20) return;
          seen.add(m[1]);
          res.push({ id: m[1], url: `https://de.aliexpress.com/item/${m[1]}.html`, text: t.slice(0, 420) });
        });
        return res.slice(0, 14);
      });

      out[key] = { query: q, searchUrl: url, items };
      console.log(`### ${key}  (${q})  -> ${items.length}`);
      items.forEach(i => console.log(`  ${i.url}\n    ${i.text}`));
    } catch (e) {
      out[key] = { query: q, error: e.message.slice(0, 200) };
      console.log(`### ${key} ERR ${e.message.slice(0, 120)}`);
    }
  }

  await b.close();
  fs.writeFileSync(process.env.OUTFILE || '/tmp/ae-out.json', JSON.stringify(out, null, 1));
}

run(JSON.parse(fs.readFileSync(process.argv[2], 'utf8')));
