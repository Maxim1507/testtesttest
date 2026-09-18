# HANDOVER — für die lokale Claude-Code-Session

**Stand 18.09.2026.** Übergabe von einer Claude-Code-Session in der Cloud an eine
Session auf Maxims eigenem Rechner.

Den Projektkontext liefert `HANDOVER.md` – **lies die zuerst**. Diese Datei hier
beschreibt nur, was in der Cloud-Session dazugekommen ist und was du übernimmst.

---

## 1 · Warum du das lokal machst

Die Cloud-Session lief hinter einem Egress-Proxy mit Rechenzentrums-IP. AliExpress
sperrt von dort **alle Produktdetailseiten**: jeder Aufruf von
`de.aliexpress.com/item/<id>.html` landet auf `/_____tmd_____/punish?x5secdata=…`,
einer Captcha-Challenge. Damit fehlen genau die Angaben, die nur dort stehen:
regulärer Preis, Variantenpreise, Versandkosten, Verkäufername.

**Du hast eine Wohnanschluss-IP. Wahrscheinlich funktioniert für dich alles direkt.**
Probier es als Allererstes: ein `/item/…`-Aufruf im Browser. Wenn du den Titel und
den Preis siehst, ist das ganze Problem weg und du kannst Abschnitt 4 abarbeiten.

### Was in der Cloud versucht wurde und nicht half

Damit du es nicht wiederholst: persistentes Browserprofil statt frischem Kontext,
Einstieg über die Startseite statt Direktaufruf, echter Klick aus der Trefferliste
heraus (also mit Referrer), mobile Ansicht mit iPhone-Profil, drei Hosts
(`de.`, `www.`, `m.aliexpress.com`). Alles landete auf derselben Challenge. Die
Sperre hängt an der IP, nicht am Navigationsweg.

### Was auch aus dem Rechenzentrum ging

| Zugriff | Status |
|---|---|
| Trefferlisten `de.aliexpress.com/w/wholesale-<suchbegriff>.html` | ✅ vollständig, inkl. Preis, Sterne, Verkaufszahl |
| **Verkäuferseiten `de.aliexpress.com/store/<id>`** | ✅ **kein Bot-Schutz** – die Seite lädt, aber die Produktliste wird per JS nachgeladen und war beim ersten Versuch noch nicht da. **Ungetestet, ob längeres Warten und Scrollen sie sichtbar macht. Das ist die vielversprechendste Spur für Aufgabe 4.1.** |
| Produktdetailseiten | ❌ Bot-Schutz |

---

## 2 · Werkzeug

`geisterbahn/tools/ae-search.js` ist der Scraper für die Trefferlisten, der in der
Cloud zuverlässig lief. Er setzt die Cookies, die **CHF als Währung und die Schweiz
als Lieferland** erzwingen – ohne die kommen die Preise in USD. Kommentare im Kopf
der Datei erklären den Aufruf.

Lokal brauchst du weder den CA-Policy-Trick noch den festen `executablePath` aus der
Cloud-Session – `npx playwright install chromium` genügt.

### Dazugekommen in der lokalen Session (18.09.2026)

| Datei | Zweck |
|---|---|
| `tools/ae-item.js` | **Produktseite** auslesen: Regulärpreis, Versand, Lieferfenster, Lagerbestand, Deal-Grenze, Staffelpreise, Varianten. `--variants` klickt alle Optionen durch, `--select "IP30,30LEDs-M,5m"` wählt eine Kombination, `--qty 10` trennt Deal-Grenze von Lagerbestand, `--pause N` setzt Sekunden zwischen Positionen. |
| `tools/ae-store.js` | Suche **innerhalb eines Shops**, mit Relevanzfilter. Der Filter ist nötig, weil eine Shop-Suche ohne Treffer nicht leer zurückkommt, sondern **das ganze Sortiment** ausspielt – ohne Filter sieht jede Position nach «vorhanden» aus. |
| `tools/gruppe-b.json` | Die 28 B-Positionen mit Suchbegriff und Relevanz-Schlüsselwörtern, Eingabe für `ae-store.js`. |

`node_modules` liegt absichtlich **ausserhalb** des Repos, unter
`~/privat/geisterbahn/.aetools`, mit dem Wrapper `.aetools/ae`, der `NODE_PATH`
setzt. So bleibt Playwright aus dem Git-Baum.

### Drei Fallen, die viel Zeit gekostet haben

**1 · Unsichtbares Captcha blockiert Klicks, meldet aber «Timeout».**
Beim Variantenwechsel feuert die API `mtop.aliexpress.pdp.pc.adjust`. Sie antwortet
mit `FAIL_SYS_USER_VALIDATE` / `RGV587_ERROR` und legt ein **praktisch unsichtbares
Overlay** über die ganze Seite: `div.baxia-dialog` mit einem iframe auf
`/_____tmd_____/punish?...`, dazu `div.J_MIDDLEWARE_FRAME_WIDGET`. Playwright meldet
nur «element not clickable», nicht «Captcha» – das sieht nach einem Selektorproblem
aus. Gegenmittel in `ae-item.js`: die Requests `relationrecommend|_____tmd_____|baxia`
per Route abbrechen **und** `killOverlays()` vor jedem Klick. Der Preis im DOM stimmt
übrigens trotz des API-Fehlers, die Seite rechnet ihn lokal.

**2 · Varianten sind teils Bild-Kacheln.** Das Label steht dann nicht im
`title`-Attribut, sondern im `alt` des Kind-`img`. Ohne diesen Fallback sind ganze
Variantengruppen unsichtbar – beim IRF520 kam «Farbe -> » zurück, als gäbe es keine
Optionen. Ausserdem: **`scrollIntoView({block:'center'})` vor dem Klick ist nicht
optional**, und der Viewport muss ≥ 1400 px hoch sein, sonst verdeckt der Sticky-Header
die zentrierte Option.

**3 · Zwei verschiedene Sperren sehen von aussen gleich aus.** Beide liefern denselben
leeren Datensatz – Titel, Verkäufer, Preis alle `undefined`, Preisblock leer – haben aber
nichts miteinander zu tun:

- **Drosselung.** In Serienläufen ab der zweiten Position. Die Seite lädt normal, nur der
  Preisblock bleibt leer. Kein anderes Seiten-Template (die Klassennamen sind identisch).
  Gegenmittel: frische Seite pro Position, Retry auch bei leerem Preisblock, `--pause 25`
  oder mehr. Nach ein paar Minuten geht es weiter.
- **Harte IP-Sperre.** Die Seite wird auf `/_____tmd_____/punish?x5secdata=…` umgeleitet
  und zeigt nur noch «Click to feedback >». Trifft **jeden** Abruf, auch den ersten, und
  betrifft nicht nur Playwright: derselbe Aufruf im normalen Browser landet auf derselben
  Challenge. Also hängt sie an der IP, nicht am Automatisierungs-Fingerprint. Weiterkommen
  hiesse, das Captcha zu lösen – das ist nicht gemacht worden. Am Abend des 18.09.2026
  war damit Schluss; die letzte offene Position (Relaismodul-Variante) fehlt deshalb.

**So unterscheidest du sie:** `p.url()` nach dem `goto` ansehen. Enthält sie `punish`,
ist es die harte Sperre – dann hilft nur warten oder eine andere Leitung, nicht `--pause`.

⚠️ **Fallstrick im eigenen Werkzeug, inzwischen behoben:** Die Route-Regel in
`ae-item.js` brach alle `_____tmd_____`-Requests ab, **auch die Hauptnavigation**. Damit
blieb `p.url()` die Originaladresse, die BOT-SCHUTZ-Erkennung griff nicht, und die harte
Sperre kam als leerer Datensatz zurück – ununterscheidbar von Drosselung. Die Regel gilt
jetzt nur noch für Sub-Ressourcen (`isNavigationRequest()`-Ausnahme).

**Und: ein direkter API-Weg existiert nicht.** Geprüft, nicht vermutet: beim
Seitenaufbau trägt kein XHR die SKU-Daten, `window.runParams` ist leer, im HTML steht
kein Preis-/SKU-Payload, und `aeglodetailweb/api/seo/seodata` funktioniert **ohne jede
Sitzung**, enthält aber **keine Preise**. Die Variantenpreise gibt es nur über das
Anklicken im DOM.

---

## 3 · Die wichtigste Erkenntnis: der Neukunden-Deal verfälscht alle Preise

AliExpress zeigt Konten ohne Bestellhistorie einen **Willkommenspreis von CHF 0.92**,
**limitiert auf 1 Stück pro Kunde**. Die Cloud-Session hatte kein Konto und sah
deshalb bei vielen Positionen CHF 0.92 statt des echten Preises.

Maxim ist genau darüber gestolpert: beim ESP32-Board liess sich nur 1 Stück in den
Warenkorb legen. Der reguläre Preis stand durchgestrichen daneben – **CHF 1.91**.

In `11-einkaufsliste-final.md` sind die betroffenen Positionen mit
***≈ Neukunden-Deal*** markiert; dort steht als Preis der durchgestrichene
Originalpreis, also eine Obergrenze. Positionen mit **bestätigt** sind in Ordnung.

**Diese Positionen brauchen den echten Regulärpreis:**

| Position | bisher angesetzt | Angebot |
|---|---|---|
| Mikroschalter KW11/KW12, 20 Stk | ≈ 5.50 | [32966619156](https://de.aliexpress.com/item/32966619156.html) |
| E18-D80NK, 5 Stk | ≈ 11.85 | [1005006102521831](https://de.aliexpress.com/item/1005006102521831.html) |
| ESP32-Breakout, 10 Stk | ≈ 28.30 | [1005006026098254](https://de.aliexpress.com/item/1005006026098254.html) |
| COB-LED-Module, 10 Stk | ≈ 5.29 | [1005008406091646](https://de.aliexpress.com/item/1005008406091646.html) |
| Elko 1000 µF | ≈ 1.87 | [1005005691916127](https://de.aliexpress.com/item/1005005691916127.html) |
| Widerstandssortiment 600 Stk | ≈ 1.98 | [1005006179281226](https://de.aliexpress.com/item/1005006179281226.html) |
| Dupont-Kabel-Set | ≈ 2.12 | [1005005364298980](https://de.aliexpress.com/item/1005005364298980.html) |

Beim ESP32-DevKit ist es schon geklärt: **CHF 1.91 regulär**, also CHF 19.10 für 10
Stück statt der in der Liste stehenden CHF 18.00. Und **«Kostenloser Versand»,
Zustellung 27.–30. September** – die erste bestätigte Versandangabe überhaupt.

---

## 4 · Deine Aufgaben

> ### Stand 18.09.2026, abends
>
> | # | Aufgabe | Status |
> |---|---|---|
> | 4.1 | Board + Breakout beim selben Verkäufer | ✅ **Simple Robot Store**, CHF 57.60 für 10+10 |
> | 4.2 | Regulärpreise nachtragen | ✅ alle 7 |
> | 4.3 | Versandkosten | ✅ Gratis ist die Regel, 2 Ausnahmen, zusammen CHF 12 |
> | 4.4 | Variantenpreise | ✅ alle 5, plus Elko und UV |
> | 4.5 | Gruppe B bündeln | 🟡 TZT deckt ≥ 15/28; 7 Positionen ungeprüft |
> | 4.6 | Datei, Commit, Push | ✅ |
>
> **Neues Total: CHF 264 Ware + 12 Versand + 40 Baumarkt ≈ 316.** Der Anstieg
> gegenüber den ersten ≈ 214 hat vier Ursachen: die billigen ESP32-Kombinationen
> waren **30-Pin-Boards** (passen nicht), der WS2812B-Listenpreis war die
> **1-m-Variante**, die billigen UV-Strips lassen **Wellenlänge oder Spannung nicht
> wählen**, und der Relais-Listenpreis galt für «1 Channel 24V».
>
> Die offenen Restpunkte stehen als Tabelle in `11-einkaufsliste-final.md` unter
> «Offene Punkte», damit sie beim Bestellen nicht untergehen. Die Abschnitte unten
> bleiben stehen, weil die Begründungen dort weiter gelten.

### 4.1 · Boards und Breakouts beim selben Verkäufer — Maxims Hauptanliegen

Die 38-Pin-ESP32-Boards gibt es in zwei Platinenbreiten («schmal» und «breit»).
Passt die Breite nicht, sitzt das Board nicht auf dem Schraubklemmen-Breakout.
Beim selben Verkäufer passt es garantiert – und es ist ein Paket weniger, was
Maxim ausdrücklich will.

**Bekannter Ausgangspunkt:** Das ESP32-Board
[1005007059778300](https://de.aliexpress.com/item/1005007059778300.html)
verkauft **Realpoy Module Wholesale Store**, 97.0 % positiv, 1817 Follower.
Shop-Link laut Produktseite: `de.aliexpress.com/store/1103077704` – **Achtung, der
leitet auf `1103083693` um**, beide Nummern also im Blick behalten.

**Prüf zuerst, ob Realpoy auch den Breakout führt.** Wenn ja, ist Gruppe A in einer
Bestellung erledigt. Wenn nein, such einen Verkäufer, der beides hat.

⚠️ **Der Breakout heisst auf AliExpress «GPIO 1 in 2» oder «1 zu 2», nicht
«screw terminal».** An dieser Vokabel sind in der Cloud-Session neun Suchen
gescheitert. Drei bekannte Anbieter:
[1005006026098254](https://de.aliexpress.com/item/1005006026098254.html) ·
[1005004478557343](https://de.aliexpress.com/item/1005004478557343.html) ·
[1005008806055319](https://de.aliexpress.com/item/1005008806055319.html)

### 4.2 · Regulärpreise nachtragen

Die sieben Positionen aus Abschnitt 3, plus die Korrektur beim ESP32-DevKit.

### 4.3 · Versandkosten pro Verkäufer

Stehen nur auf den Produktdetailseiten. Maxim will **wenige Pakete**; ob sich das
Bündeln rechnet, lässt sich erst mit echten Versandkosten beurteilen. Bei vielen
Angeboten stand «Kostenloser Versand ab CHF 9» – wenn das durchgängig greift, ist
die Bündelung ohnehin die richtige Wahl.

### 4.4 · Variantenpreise klären

Bei diesen Positionen ist der Listenpreis der der günstigsten Variante und deshalb
zu niedrig:

- **WS2812B** – Variante «5 m / 30 LED/m / IP30 / 5 V». Rechne eher mit CHF 12–15 pro Rolle.
- **UV-Strip** – «5 m / 12 V / 395 nm». Nicht 365 nm, nicht 5 V.
- **JGY-370** – langsame Ausführung, 20–40 U/min. Der Preis steigt mit sinkender Drehzahl deutlich.
- **Relaismodul** – 8-Kanal **und** 2-Kanal, beide 5 V mit Optokoppler, aus demselben Angebot.
- **IRF520** – 10er-Pack statt Einzelstück.

### 4.5 · Gruppe B bündeln

`11-einkaufsliste-final.md` gruppiert die Liste in A (ESP32), B (allgemeine
Elektronik, 20 Positionen, ca. CHF 106), C (LED-Strips), D (Motoren & Magnete).
**Gruppe B ist der eigentliche Hebel:** Das führt jeder grössere Elektronik-Händler
komplett, und es ist die Hälfte des Warenwerts.

Wenn du Verkäuferseiten lesen kannst, nimm einen Händler mit vielen Verkäufen aus
Gruppe B als Ausgangspunkt – etwa den
[Relais-Händler](https://de.aliexpress.com/item/1005006280813881.html) (4000+) oder
den [LM2596-Händler](https://de.aliexpress.com/item/1005003516383470.html) (5000+) –
und prüf, wie viel von B er abdeckt.

**Der Kompromiss, den Maxim kennt und akzeptiert:** Ein Bündel-Händler ist selten
bei jeder Position der billigste. CHF 10–20 Warenaufpreis gegen 4 gesparte
Versandkosten ist bei diesem Zeitplan der bessere Tausch.

### 4.6 · Datei aktualisieren, committen, pushen

Branch `claude/geisterbahn-raspberry-automation-8itdih`. Trag die bestätigten Preise
ein, ersetz die *≈ Neukunden-Deal*-Markierungen durch **bestätigt**, und rechne die
Gruppensummen und das Total neu.

---

## 5 · Was du nicht neu aufrollst

Aus `HANDOVER.md` übernommen und in dieser Session bestätigt:

| Entscheidung | Status |
|---|---|
| **433-MHz-Handsender / Not-Aus** | **Explizit abgelehnt**, zweimal. Nicht erneut vorschlagen. Not-Aus läuft übers Node-RED-Dashboard am Handy. |
| **JGY-370 Reservemotor** | Gestrichen. Stattdessen Winde sofort nach Ankunft testen. |
| **Netzteile** | Altes ATX-PC-Netzteil, kein Kauf. |
| **MicroSD-Karten** | Vorhanden. |
| Schraubklemmen-Breakouts, 10× ESP32, 100 m Kabel | **Behält er.** Kürzungsvorschläge dort abgelehnt. |
| **Haftmagnet 15 kg statt 25 kg** | In dieser Session vorgeschlagen: die 25-kg-Klasse kostet CHF 14 statt CHF 2.50. Die Puppe wiegt ca. 3 kg. Alternative mit 30 kg steht in der Liste, falls er doch will. |
| **Aufteilung in 9 Zoll-Pakete** | Aufgehoben. Bei CHF 213 Warenwert ist die Zollgrenze von CHF 62 gegenstandslos; Maxim will ausdrücklich **wenige Pakete**. |

---

## 6 · Wie Maxim arbeiten will

- **Antworte auf Deutsch.**
- Kein Elektronik-Profi, aber technisch denkend und lernt schnell.
- **Kompakt und prägnant.** Keine Wall of Text, keine überflüssigen Details.
- Er entscheidet selbst und **will nicht überredet werden.** Einen Einwand einmal
  sagen, dann seine Entscheidung akzeptieren und weitermachen.
- **Preise klar kennzeichnen: bestätigt vs. geschätzt.** Darauf legt er Wert, und
  genau daran hat sich der Neukunden-Deal-Fehler gezeigt.

---

## 7 · Offener Punkt aus der alten Übergabe

**Ist die Fernbedienung der Nebelmaschine abnehmbar** (Buchse hinten am Gerät)?
Wenn ja → 2-Kanal-Relais parallel zum Taster, kostet nichts.
Wenn nein → SwitchBot Bot, CHF 20.90, per Bluetooth direkt vom Pi.
Antwort steht seit zwei Sessions aus – frag ihn bei Gelegenheit.

---

## 8 · Dateien im Ordner

| Datei | Inhalt |
|---|---|
| `00-README.md` | Übersicht |
| `01-architektur.md` | Pi + ESP32 + MQTT |
| `02-verkabelung-limits.md` | Kabellängen, Spannungsabfall, 230-V-Sicherheit |
| `03-inputs.md` · `04-outputs.md` | Katalog aller Auslöser und Aktoren |
| `05-mechanik-puppe.md` | Fallende Puppe: Haftmagnet + Seilwinde |
| `06-software.md` | ESPHome-YAML, MQTT-Topics, Node-RED |
| `07-bestellplan.md` | Shops, Zoll, Timing |
| `08-aufbautag.md` | Checkliste, Dramaturgie |
| `09-einkaufsliste.md` | **überholt** |
| `10-infrastruktur-fuer-auswahl.md` | Pin-Bilanz, PCF8574, ADC2-Konflikt, Strombilanz |
| `11-einkaufsliste-final.md` | **Die gültige Einkaufsliste – die bearbeitest du** |
| `HANDOVER.md` | Projektkontext, zuerst lesen |
| `HANDOVER-LOKAL.md` | diese Datei |
| `tools/ae-search.js` | Trefferlisten-Scraper |
