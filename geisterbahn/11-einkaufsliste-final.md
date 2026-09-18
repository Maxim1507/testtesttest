# 11 – Einkaufsliste FINAL

**Stand 18.09.2026.** Ersetzt `09-einkaufsliste.md`.
**Preise direkt bei AliExpress abgerufen** (Suchergebnisseiten, Währung CHF,
Lieferland Schweiz, sortiert nach Bestellungen).

| | CHF |
|---|---|
| AliExpress (Ware, inkl. Breakouts) | **≈ 214** |
| Versandkosten AliExpress | grösstenteils offen, ≈ 0–30 |
| Baumarkt | ≈ 40 |
| Netzteile, SD-Karten | **0** – vorhanden |
| **Total** | **≈ 253–283** |

> **Rund CHF 100 weniger als die bisherige Schätzung von CHF 379.**
> Die alte Liste war durchgehend zu pessimistisch kalkuliert.

---

## Warum jetzt 4 Bestellungen statt 9

**Ein Paket = ein Verkäufer.** AliExpress versendet pro Verkäufer, nicht pro
Warenkorb. Die Zahl der Pakete bestimmst du also nicht durch die Aufteilung der
Liste, sondern dadurch, bei wie vielen verschiedenen Verkäufern du bestellst.

Die alte Aufteilung in 9 thematische Pakete kam von der **Zollgrenze CHF 62**.
Bei einem Warenwert von CHF 213 ist die kein Thema mehr – selbst alles in einer
Sendung bliebe darunter. Die Themen-Pakete haben damit keinen Zweck mehr.

Die Liste ist jetzt nach **Verfügbarkeit** gruppiert statt nach Thema:

| | Gruppe | ≈ CHF | Warum eigener Verkäufer |
|---|---|---|---|
| **A** | ESP32-Boards + Breakouts | 46 | ESP-Spezialisten; Board und Breakout müssen zueinander passen |
| **B** | Alles Allgemeine: Sensoren, Module, Treiber, Servos, Ton, Relais, Verbrauchsmaterial | 106 | führt **jeder** grössere Elektronik-Händler |
| **C** | LED-Strips (WS2812B, UV) | 29 | LED-Händler, Meterware |
| **D** | Motoren + Magnete | 18 | Motoren-/Magnet-Händler (z. B. Bringsmart) |
| | *Arcade-Taster* | 9 | Arcade-Teile; meist eigener Shop → sonst 5. Paket |

**Gruppe B ist der eigentliche Gewinn:** 20 Positionen, gut die Hälfte des
Warenwerts, und es gibt viele Händler, die das komplett führen.

### So bündelst du B selbst (5 Minuten in der App)

1. Öffne aus Gruppe B das Angebot mit den meisten Verkäufen – den
   [Relais-Händler](https://de.aliexpress.com/item/1005006280813881.html) (4000+)
   oder den [LM2596-Händler](https://de.aliexpress.com/item/1005003516383470.html) (5000+).
2. Tippe auf den **Shop-Namen** über dem Produkt.
3. Nutze die **Suche innerhalb des Shops** für die übrigen Positionen der Gruppe.
4. Was der Shop nicht führt, nimmst du aus der Liste unten beim verlinkten Anbieter.

> **Diesen Schritt übernimmt die lokale Session** (`HANDOVER-LOKAL.md`). Aus der
> Cloud waren Produktseiten gesperrt; Verkäuferseiten dagegen offenbar **nicht** –
> das wurde erst am Schluss entdeckt und nicht mehr zu Ende geprüft. Bis dahin ist
> unten pro Position der beste Einzelanbieter verlinkt.

> **Der Kompromiss:** Ein Bündel-Händler ist selten bei jeder einzelnen Position
> der billigste. Rechne mit CHF 10–20 Aufpreis auf die Ware – und spare dafür
> 5 Versandkosten, 5 Sendungsverfolgungen und 5 Gelegenheiten, dass ein Paket
> hängen bleibt. Bei diesem Zeitplan ist das ein guter Tausch.

---

## Wie die Preise zu lesen sind

| Markierung | Bedeutung |
|---|---|
| **bestätigt** | Preis stand am 18.09.2026 so auf der AliExpress-Trefferliste, in CHF, Lieferland Schweiz. |
| **≈ Neukunden-Deal** | AliExpress zeigt Konten ohne Bestellhistorie den Willkommenspreis **CHF 0.92**, **limitiert auf 1 Stück pro Kunde**. Das ist kein echter Preis. Angegeben ist der durchgestrichene Originalpreis – das ist die **Obergrenze**, der echte Preis liegt darunter. **Diese Positionen müssen noch verifiziert werden**, siehe `HANDOVER-LOKAL.md`. |
| **Versand** | **Nicht ermittelbar** (Bot-Schutz, siehe «Offene Punkte»). Bei vielen Angeboten stand «Kostenloser Versand ab CHF 9» – bei gebündelten Bestellungen dürfte das meist greifen. |

> **Varianten-Dropdowns prüfen.** Alle Preise gelten für die Standardvariante der
> Trefferliste. «1pc / 5pcs / 10pcs» und «5V / 12V» ändern den Preis deutlich –
> das ist bei diesen Artikeln wichtiger als der Titel.

---

## 🇨🇳 Gruppe A · ESP32 — ≈ CHF 46

| Menge | Artikel | CHF/Stk | Total | Angebot |
|---|---|---|---|---|
| 10 | ESP32 DevKit ⚠️ **38 Pin, ESP-WROOM-32** | **1.91 bestätigt** (Regulärpreis) · 4.8★ · 1000+ · **Versand gratis** | 19.10 | [ESP-WROOM-32 DevKitC 38PINS](https://de.aliexpress.com/item/1005007059778300.html) – Realpoy Module Wholesale Store |
| | *Sicherere Alternative, mehr Verkäufe* | 4.17 **bestätigt** · 4.8★ · 4000+ | 41.70 | [ESP-32 30/38-Pin CP2102](https://de.aliexpress.com/item/1005006220389074.html) |
| 10 | Schraubklemmen-Breakout (38 Pin) | 2.83 *≈ Neukunden-Deal* · 4.8★ · 900+ | ≈ 28.30 | [ESP-32S 38pin Anschluss-Schraube-Board](https://de.aliexpress.com/item/1005006026098254.html) |

> **Der Schraubklemmen-Breakout heisst auf AliExpress «GPIO 1 in 2» oder «1 zu 2»** –
> nicht «screw terminal». Deshalb war er über neun Suchen hinweg unauffindbar.
> Zwei weitere Anbieter, beide 38-Pin, beide 4.8★:
> [38-PIN Schmalversion, CHF 2.21](https://de.aliexpress.com/item/1005004478557343.html) ·
> [ESP-WROOM-32 schmale Version, CHF 2.54](https://de.aliexpress.com/item/1005008806055319.html)
>
> ⚠️ **Boards und Breakouts beim selben Verkäufer bestellen.** Die 38-Pin-Boards gibt
> es in zwei Platinenbreiten («schmal» und «breit»). Passt die Breite nicht, sitzt
> das Board nicht auf dem Breakout. Beim selben Verkäufer passt es garantiert – und
> es ist ohnehin ein Paket weniger.
>
> Teurere Alternative mit Status-LEDs und mehreren 5-V-/3,3-V-Abgriffen:
> [Freenove Terminal Block Shield, CHF 16.76](https://de.aliexpress.com/item/1005005879655901.html)
> – für 10 Stationen mit CHF 168 zu teuer, aber gut für die eine Station, an der du
> am meisten steckst.

> Zum Vergleich: **Bastelgarage** verlangt für ein ESP32-DevKit CHF 15–18 pro Stück.
> Die 10 Boards würden in der Schweiz rund CHF 160 kosten.

---

## 🇨🇳 Gruppe B · Allgemeine Elektronik — ≈ CHF 106

**Das Bündel-Paket.** 20 Positionen, die jeder grössere Elektronik-Händler führt.

### B1 · Kleinsensoren — ≈ CHF 22

| Menge | Artikel | CHF/Stk | Total | Angebot |
|---|---|---|---|---|
| 10 | Reed-/Magnetkontakt MC-38, verdrahtet | 0.28 **bestätigt** · 4.9★ · 4000+ | 2.80 | [MC-38 Tür-/Fenstersensor](https://de.aliexpress.com/item/1005005770705170.html) |
| 20 | Mikroschalter Rollenhebel KW11/KW12 | 2.74 / 10 Stk *≈ Neukunden-Deal* · 4.9★ · 3000+ | ≈ 5.50 | [10 Stk Mini-Endschalter SPDT](https://de.aliexpress.com/item/32966619156.html) |
| 10 | Hall-Sensor-Modul KY-003 (A3144) | 0.49 **bestätigt** · 4.9★ | 4.90 | [KY-003 Hall-Modul](https://de.aliexpress.com/item/1005008375336549.html) |
| 10 | TTP223 Touch-Sensor | 0.17 **bestätigt** · 4.8★ · 4000+ | 1.70 | [TTP223 Touch-Modul](https://de.aliexpress.com/item/10000007953784.html) |
| 4 | SW-420 Vibrationssensor | 0.60 **bestätigt** · 4.7★ | 2.40 | [TZT SW-420](https://de.aliexpress.com/item/32835844366.html) |
| 10 | LDR-Modul ⚠️ **4-Pin, LM393, mit `D0`** | 0.30 **bestätigt** · 4.8★ · 2000+ | 3.00 | [Fotowiderstand-Modul 4pin LM393](https://de.aliexpress.com/item/1005002327161114.html) |
| 5 | RCWL-0516 Mikrowellen-Radar | 0.39 **bestätigt** · 4.7★ · 900+ | 1.95 | [RCWL-0516](https://de.aliexpress.com/item/32704946341.html) |

### B2 · Grosssensoren — ≈ CHF 20

| Menge | Artikel | CHF/Stk | Total | Angebot |
|---|---|---|---|---|
| 5 | E18-D80NK IR-Reflexlichtschranke ⚠️ NPN/NO | 2.37 *≈ Neukunden-Deal* · 4.9★ · 500+ | ≈ 11.85 | [E18-D80NK 3–80 cm](https://de.aliexpress.com/item/1005006102521831.html) |
| 2 | IR-Barriere, Sender + Empfänger | 2.86 **bestätigt** · 4.2★ · 1000+ | 5.72 | [Einzelstrahl-Infrarot-Barriere](https://de.aliexpress.com/item/1005005978321872.html) |
| 5 | RC522 RFID-Leser + Tags | 0.56 **bestätigt** · 4.8★ · 5000+ | 2.80 | [RC522 Kit mit Tags](https://de.aliexpress.com/item/1005006440663319.html) |

### B3 · Adapter & Treiber — ≈ CHF 16

| Menge | Artikel | CHF/Stk | Total | Angebot |
|---|---|---|---|---|
| 10 | PCF8574 I/O-Expander | 0.58 **bestätigt** · 4.9★ · 1000+ | 5.80 | [TZT PCF8574 Modul](https://de.aliexpress.com/item/1005009188039073.html) |
| 8 | IRF520 MOSFET-Modul | 0.61 **bestätigt** (5er-Pack CHF 2.75) · 4.9★ · 900+ | ≈ 5.00 | [IRF520 MOS-Treiber 5/10 Stk](https://de.aliexpress.com/item/1005006157177189.html) |
| 5 | 74AHCT125 Pegelwandler (DIP-14) | 1.67 / 5 Stk **bestätigt** · 4.9★ · 2000+ | 1.67 | [SN74AHCT125N DIP-14](https://de.aliexpress.com/item/1005007655828920.html) |
| 10 | LM2596 Step-Down 12 → 5 V | 0.38 **bestätigt** · 4.9★ · 5000+ | 3.80 | [LM2596S 3 A einstellbar](https://de.aliexpress.com/item/1005003516383470.html) |

### B4 · Servos & Ton — ≈ CHF 22

| Menge | Artikel | CHF/Stk | Total | Angebot |
|---|---|---|---|---|
| 10 | Servo SG90 (9 g) | 0.50 **bestätigt** · 4.8★ · 5000+ | 5.00 | [SG90 Micro-Servo 180°](https://de.aliexpress.com/item/1005008707927948.html) |
| 3 | Servo MG996R (Metall) | 1.44 **bestätigt** · 4.7★ · 2000+ | 4.32 | [MG995/MG996R 13–15 kg](https://de.aliexpress.com/item/1005002990973782.html) |
| 5 | DFPlayer Mini | 0.85 **bestätigt** · 4.8★ · 4000+ | 4.25 | [DFPlayer Mini V3.0 16P](https://de.aliexpress.com/item/32665891488.html) |
| 5 | Lautsprecher 3 W / 8 Ω im Gehäuse | 1.12 **bestätigt** · 4.7★ · 2000+ | 5.60 | [3525/2030 Hohlraumlautsprecher](https://de.aliexpress.com/item/1005007640238935.html) |
| 3 | PAM8403 Verstärker | 0.90 **bestätigt** · 4.9★ · 2000+ | 2.70 | [PAM8403 2×3 W](https://de.aliexpress.com/item/1005008554786164.html) |

### B5 · 12-V-Licht & Relais — ≈ CHF 18

| Menge | Artikel | CHF/Stk | Total | Angebot |
|---|---|---|---|---|
| 10 | 12-V-COB-LED-Modul | 5.29 / 10 Stk *≈ Neukunden-Deal* · 4.9★ · 10 000+ | ≈ 5.29 | [12 V COB-LED-Module, 10 Stk, IP65](https://de.aliexpress.com/item/1005008406091646.html) |
| 1 | Stroboskop 12 V LED | 1.19 **bestätigt** · 4.7★ · 3000+ | 1.19 | [12-LED-Stroboskop 12–24 V](https://de.aliexpress.com/item/1005008034979845.html) |
| 1 | Relaismodul 8-Kanal ⚠️ **5 V + Optokoppler** | ≈ 4–5 **Variante wählen** · 4.7★ · 4000+ | ≈ 4.50 | [1/2/4/6/8-Kanal Relais 5 V Optokoppler](https://de.aliexpress.com/item/1005006280813881.html) |
| 5 | Relaismodul 2-Kanal 5 V | 1.32 **bestätigt** · 4.7★ · 4000+ | 6.60 | *dasselbe Angebot, Variante «2 Kanal 5V»* |

### B6 · Verbrauchsmaterial — ≈ CHF 8

| Menge | Artikel | CHF | Angebot |
|---|---|---|---|
| 100 | 1N4007 Dioden ⚠️ **Freilauf an jede Spule – Pflicht** | 1.47 **bestätigt** · 4.9★ · 3000+ | [100 Stk 1N4007 1 A 1000 V DO-41](https://de.aliexpress.com/item/1005006454795578.html) |
| 10 | Elko 1000 µF / 16 V (an jeden LED-Strip-Anfang) | ≈ 1.87 *≈ Neukunden-Deal* · 4.9★ | [Elektrolytkondensatoren, Wert wählen](https://de.aliexpress.com/item/1005005691916127.html) |
| 600 | Widerstandssortiment ¼ W, 1 %, 30 Werte | ≈ 1.98 *≈ Neukunden-Deal* · 4.9★ · 2000+ | [600 Stk Metallfilm-Widerstandsset](https://de.aliexpress.com/item/1005006179281226.html) |
| 120 | Dupont-Kabel-Set (M-M, M-F, F-F) | ≈ 2.12 *≈ Neukunden-Deal* · 4.9★ · 3000+ | [Dupont 40–120 Stk, 10/20/30 cm](https://de.aliexpress.com/item/1005005364298980.html) |

---

## 🇨🇳 Gruppe C · LED-Strips — ≈ CHF 29

| Menge | Artikel | CHF/Stk | Total | Angebot |
|---|---|---|---|---|
| 2 | WS2812B 5 m, 30 LED/m, ⚠️ **5 V, IP30** | 11.42 **bestätigt** · 4.8★ · 5000+ | 22.84 | [WS2812B 5 V 30/60/144 LED, 1–5 m](https://de.aliexpress.com/item/1005009580843710.html) |
| 2 | UV-LED-Strip 5 m, 395 nm, ⚠️ **12 V** | 3.27 **bestätigt** · 4.5★ | 6.54 | [UV-Strip 5 M DC12V 385–400 nm](https://de.aliexpress.com/item/1005009512141454.html) |
| | *Alternative UV, bessere Bewertung* | 1.96 **bestätigt** · 5.0★ | | [5 m 12 V UV 365/395 nm IP20/IP65](https://de.aliexpress.com/item/2037523901.html) |

> ⚠️ Bei beiden Strips ist die **Variantenwahl entscheidend**: Länge (1 m vs. 5 m),
> LED-Dichte und Spannung stehen alle im selben Angebot. Der angezeigte Preis ist
> immer der der günstigsten Variante. Rechne beim WS2812B eher mit CHF 12–15 pro 5-m-Rolle.

> Viele LED-Händler führen WS2812B **und** UV – prüf beim Bestellen, ob dein
> WS2812B-Verkäufer auch den UV-Strip hat. Dann wird aus C ein einziges Paket.

> Zum Vergleich: **Bastelgarage** verkauft 0.33 m WS2812B für CHF 4.50 – das wären
> rund CHF 68 pro 5 m.

---

## 🇨🇳 Gruppe D · Motoren & Magnete — ≈ CHF 18

| Menge | Artikel | CHF/Stk | Total | Angebot |
|---|---|---|---|---|
| 1 | JGY-370 Schneckengetriebemotor 12 V ⚠️ **20–40 U/min wählen** | 3.37 **bestätigt** · 4.8★ · 5000+ | 3.37 | [ZGY370/JGY370 4632 6/12/24 V](https://de.aliexpress.com/item/1005004615731578.html) |
| 3 | L298N H-Brücke | 1.37 **bestätigt** · 4.9★ | 4.11 | [EGBO L298N Dual-H-Brücke](https://de.aliexpress.com/item/1005007130054374.html) |
| 2 | Hubmagnet 12 V Push-Pull, **Hub 10 mm, 25 N** | 2.64 **bestätigt** · 4.9★ · 4000+ | 5.28 | [JF-1039 12 V 25 N Hub 10 mm](https://de.aliexpress.com/item/32618067363.html) |
| 2 | Elektro-Haftmagnet 12 V, **P30/25, 15 kg / 150 N** | 2.49 **bestätigt** · 4.9★ | 4.98 | [P30/25 Haltemagnet 15 kg](https://de.aliexpress.com/item/1005004388519956.html) |

> **Die L298N passen auch in Gruppe B**, falls dein Bündel-Händler sie führt –
> dann wird D noch kleiner. Magnet- und Motorenhändler führen sie meist nicht.

> **Haftmagnet: 15 kg statt 25 kg.** Die 25-kg-Klasse kostet bei gleicher Bauart
> CHF 14 statt CHF 2.50 – ein Faktor 5 für eine Puppe, die vielleicht 3 kg wiegt.
> Wenn du auf 25 kg bestehst: [34/25K, 30 kg, CHF 13.89](https://de.aliexpress.com/item/32819597779.html).

> ⚠️ **Winde als Erstes aufbauen und testen**, sobald das Paket da ist. Es gibt
> keinen Reservemotor – ein Test im Oktober lässt noch Zeit zum Nachbestellen.
> **Deshalb: Gruppe D zuerst bestellen**, auch wenn sie die kleinste ist.

> **Der JGY-370-Preis hängt stark von der Drehzahl-Variante ab.** CHF 3.37 ist der
> Einstiegspreis der Trefferliste; langsame Varianten (20–40 U/min) können mehr kosten.

---

## 🇨🇳 Einzelposition · Arcade-Taster — ≈ CHF 9

| Menge | Artikel | CHF/Stk | Total | Angebot |
|---|---|---|---|---|
| 4 | Arcade-Taster 60 mm, beleuchtet ⚠️ **12-V-Variante** | 2.25 **bestätigt** · 4.9★ · 1000+ | 9.00 | [60 mm Arcade-Taste 5/12 V](https://de.aliexpress.com/item/33028873701.html) |

> Arcade-Teile kommen meist aus spezialisierten Shops. **Versuch zuerst, sie in
> Gruppe B unterzubringen** – viele Elektronik-Händler führen auch beleuchtete
> Drucktaster. Wenn nicht, ist das dein 5. Paket. Für CHF 9 Ware lohnt sich ein
> eigener Versand kaum – notfalls streichen und stattdessen normale Drucktaster
> aus Gruppe B nehmen.

**AliExpress Ware total ≈ CHF 214** – Stand vor der Verifikation der Neukunden-Deal-Preise, die noch aussteht (`HANDOVER-LOKAL.md`)

---

## 🇨🇭 Baumarkt / lokal — ≈ CHF 40

| Menge | Artikel | ca. | Wo |
|---|---|---|---|
| 100 m | Alarmkabel 4-adrig | 25 *geschätzt* | Jumbo / Bauhaus |
| – | Lüsterklemmen oder WAGO 221 | 15 *geschätzt* | Jumbo / Bauhaus |

> Galaxus-Preise konnte ich nicht prüfen – die Suche von Galaxus weist Anfragen
> aus Rechenzentren ab (403 «Access denied»), nur die Startseite lädt. Diese beiden
> Positionen bleiben geschätzt.

---

## 🏠 Aus dem Bestand — CHF 0

| Artikel | Hinweis |
|---|---|
| **Altes ATX-PC-Netzteil** | Ersetzt alle drei geplanten Netzteile. 12 V mit 15–25 A und 5 V mit 15–20 A gleichzeitig, geprüft, gekapselt, mit Überstromschutz. Einschalten: **grünes Kabel (PS_ON) mit einem schwarzen (GND) brücken.** Ältere Modelle brauchen eine Mindestlast auf 5 V – eine 12-V-Autolampe oder 10 Ω/10 W genügt. Lüfter ist hörbar → in die Regie stellen. Falls keins da: Ricardo/tutti CHF 10–20. |
| **8–10 alte Handyladegeräte 5 V** | Versorgung der entfernten ESP32-Stationen |
| **MicroSD-Karten (5×)** | Für die DFPlayer, 2–32 GB reichen |
| **Nebelmaschine** | Schalten über ein 2-Kanal-Relais parallel zum Taster der Kabelfernbedienung – **prüfen, ob die Fernbedienung abnehmbar ist** (Buchse hinten am Gerät). |

---

## Reihenfolge

1. **Gruppe D (Motoren & Magnete) zuerst.** Die Winde ist das einzige Teil ohne
   Reserve und mit echtem Ausfallrisiko. Sofort nach Ankunft testen.
2. **Gruppe A (ESP32) und B (Elektronik)** gleich hinterher – das ist der Grossteil.
3. **Gruppe C (LED-Strips)** kann warten, Deko-Licht ist nicht kritisch.
4. Gruppe B und A liessen sich im Notfall auch in der Schweiz nachkaufen
   (Bastelgarage, BerryBase, ShopOfThings) – zu etwa dem Fünffachen.

---

## Offene Punkte

### 1 · Versandkosten

Nicht ermittelbar, und es bleibt dabei. Die AliExpress-Produktdetailseiten lösen
den Bot-Schutz aus (Weiterleitung auf `/_____tmd_____/punish`), und nur dort stehen
die echten Versandkosten in die Schweiz. Versucht wurden: echte Sitzung mit
persistentem Profil, Einstieg über die Startseite, Klick aus der Trefferliste statt
Direktaufruf, mobile Ansicht mit Telefon-Profil, drei Hosts (`de.`, `www.`, `m.`).
Alle landen auf derselben Challenge – die Sperre hängt an der Rechenzentrums-IP,
nicht am Navigationsweg. Weiter zu gehen hiesse, die Schutzmassnahme selbst
auszuhebeln; das ist nicht gemacht worden.

Dasselbe gilt für Shop- und Verkäuferseiten – deshalb muss das Bündeln der
Gruppe B von dir kommen.

Die Trefferlisten sind davon nicht betroffen und waren durchgehend lesbar, deshalb
stimmen die Artikelpreise.

**Die Versandkosten stehen im Warenkorb** – sobald sie bekannt sind, lässt sich
durchrechnen, ob sich die Bündelung gelohnt hat.

### 2 · Nebelmaschinen-Fernbedienung

Weiterhin offen: Ist die Fernbedienung abnehmbar (Buchse hinten am Gerät)?
Wenn ja → 2-Kanal-Relais parallel zum Taster, kostet nichts.
Wenn nein → SwitchBot Bot, CHF 20.90, per Bluetooth direkt vom Pi.

---

## Vor dem Absenden prüfen

1. **ESP32 DevKit: 38-Pin-Version.** Die 30-Pin-Boards passen nicht auf das Breakout.
   Beide Varianten stecken oft im selben Angebot – Dropdown kontrollieren.
   Zusätzlich auf die **Platinenbreite** achten (schmal vs. breit); Boards und
   Breakouts beim selben Verkäufer bestellen.
2. **UV-Strip: 12 V**, 395–400 nm, nicht 365 nm. Er hängt an der 12-V-Schiene.
3. **WS2812B: 5 V**, wirklich WS2812B (nicht WS2811), IP30. Variante «5 m / 30 LED/m».
4. **LDR-Modul: 4 Pins mit `D0` und Poti.** Nur der Digitalausgang umgeht den
   ADC2/WLAN-Konflikt des ESP32 (`10`).
5. **Relais: 5 V Spulenspannung und Optokoppler**, nicht die 12-V-Variante.
6. **JGY-370: langsame Ausführung, 20–40 U/min.**
7. **Arcade-Taster: 12-V-Variante**, nicht 5 V.

---

## Bewusst gestrichen

| Artikel | Begründung |
|---|---|
| 433-MHz-Handsender + Empfänger | Nicht gewünscht. Not-Aus steht im Node-RED-Dashboard auf dem Handy (`06`). |
| JGY-370 Reservemotor | Stattdessen: Winde sofort nach Ankunft testen. |
| Netzteile, MicroSD | Aus dem Bestand. |
| Aufteilung in 9 Zoll-Pakete | Bei CHF 213 Warenwert gegenstandslos. Siehe oben. |

---

## Erreichbarkeit der Shops (Stand 18.09.2026)

| Domain | Status |
|---|---|
| `de.aliexpress.com` – **Trefferlisten** | ✅ funktioniert, Preise in CHF, Lieferland CH |
| `de.aliexpress.com` – **Produktseiten** | ❌ Bot-Schutz, Weiterleitung auf `/_____tmd_____/punish` |
| `de.aliexpress.com` – **Verkäuferseiten** `/store/<id>` | ⚠️ kein Bot-Schutz, Seite lädt – Produktliste wird aber per JS nachgeladen und war beim ersten Versuch noch nicht da. Ungetestet. |
| `ae01.alicdn.com` | ✅ Bilder-CDN |
| `www.bastelgarage.ch` | ✅ vollständig, servergerendert |
| `www.berrybase.ch` | ✅ vollständig |
| `shopofthings.ch` | ✅ seit Ergänzung der nackten Domain in der Allowlist (`*.shopofthings.ch` allein reicht nicht, der Shop leitet `www` → nackte Domain um) |
| `www.galaxus.ch` / `www.digitec.ch` | ⚠️ Startseite ja, **Suche 403** («Access denied», Rechenzentrums-IP) |
| `www.pi-shop.ch` | ❌ Cloudflare-Challenge. Nach Freigabe von `challenges.cloudflare.com` lädt die Prüfung zwar, läuft aber nicht durch – Rechenzentrums-IP. Bleibt gesperrt. |

**Technische Notiz für die nächste Session:** Chromium aus `/opt/pw-browsers`
vertraut dem Egress-Proxy-CA nicht von Haus aus (`ERR_CERT_AUTHORITY_INVALID`).
Lösung ohne Abschalten der TLS-Prüfung: die Anthropic-CAs aus
`/root/.ccr/ca-bundle.crt` als base64-DER in eine Chromium-Enterprise-Policy
schreiben (`/etc/chromium/policies/managed/ccr-ca.json`, Schlüssel `CACertificates`).
Ausserdem passt die npm-Playwright-Version nicht zum vorinstallierten Browser –
`executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'` setzen
statt `playwright install` auszuführen.
