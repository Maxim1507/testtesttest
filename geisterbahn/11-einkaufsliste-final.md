# 11 – Einkaufsliste FINAL

**Stand 18.09.2026.** Ersetzt `09-einkaufsliste.md`.
**Preise direkt bei AliExpress abgerufen** (Währung CHF, Lieferland Schweiz).
Die mit **bestätigt** markierten Positionen stammen von der **Produktseite** –
inklusive Variante, Versand und Lagerbestand. Der Rest kommt aus der Trefferliste.

| | CHF |
|---|---|
| AliExpress (Ware, inkl. Breakouts) | **≈ 234** |
| Versandkosten AliExpress | **≈ 13** – ermittelt, nur 3 Positionen kosten überhaupt Versand |
| Baumarkt | ≈ 40 |
| Netzteile, SD-Karten | **0** – vorhanden |
| **Total** | **≈ 287** |

> **Rund CHF 90 weniger als die bisherige Schätzung von CHF 379.**
> Die alte Liste war durchgehend zu pessimistisch kalkuliert.

> **Änderung gegenüber dem ersten Stand (≈ 214 + offener Versand):** die sieben
> Positionen mit Neukunden-Deal-Preis sind jetzt auf Regulärpreise korrigiert und
> die Versandkosten sind ermittelt. Der grösste Sprung: **WS2812B kostet 18.56
> statt 11.42 pro 5-m-Rolle** (der alte Wert war die 1-m-Variante) und der
> UV-Strip ist teurer als gedacht – Gruppe C geht von 29 auf 52.

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
| **A** | ESP32-Boards + Breakouts | 47 | ESP-Spezialisten; Board und Breakout müssen zueinander passen |
| **B** | Alles Allgemeine: Sensoren, Module, Treiber, Servos, Ton, Relais, Verbrauchsmaterial | 108 | führt **jeder** grössere Elektronik-Händler |
| **C** | LED-Strips (WS2812B, UV) | 52 | LED-Händler, Meterware |
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

> **Stand 18.09.2026:** Die Shop-Suche ist inzwischen lokal automatisiert
> (`tools/ae-store.js`). Ergebnis bisher: **TZT Official Store deckt mindestens
> 15 der 28 B-Positionen** und ist damit der beste Bündel-Kandidat; Realpoy deckt
> nur 9 von 20. Sicher **nicht** bei TZT: Reed MC-38, LDR-Modul, 74AHCT125, SG90,
> DFPlayer, Arcade-Taster – die kommen aus den unten verlinkten Einzelangeboten.
> Rechne also mit **B = TZT-Paket + 1–2 Restpaketen**, nicht mit einem einzigen.

> **Der Kompromiss:** Ein Bündel-Händler ist selten bei jeder einzelnen Position
> der billigste. Rechne mit CHF 10–20 Aufpreis auf die Ware – und spare dafür
> 5 Versandkosten, 5 Sendungsverfolgungen und 5 Gelegenheiten, dass ein Paket
> hängen bleibt. Bei diesem Zeitplan ist das ein guter Tausch.

---

## Wie die Preise zu lesen sind

| Markierung | Bedeutung |
|---|---|
| **bestätigt** | Preis am 18.09.2026 **auf der Produktseite** abgerufen, in CHF, Lieferland Schweiz – nicht aus der Trefferliste. Das ist der **Regulärpreis** (der durchgestrichene), nicht der Neukunden-Preis. Wo eine Variante angegeben ist, gilt der Preis für genau diese Variante. |
| *ohne Markierung* | Noch aus der Trefferliste, Standardvariante, nicht auf der Produktseite gegengeprüft. |
| **Versand** | **Ermittelt.** Steht bei jeder Position dabei. Gratis ist die Regel; die Ausreisser sind unten mit ⚠️ markiert. |

> **Neukunden-Deals sind bereinigt.** AliExpress zeigt Konten ohne Bestellhistorie
> Willkommenspreise um **CHF 0.92–14.78**, **limitiert auf 1 Stück pro Kunde** – kein
> echter Preis. Alle sieben betroffenen Positionen sind jetzt mit dem Regulärpreis
> von der Produktseite eingetragen. Wenn du selbst noch nie bei AliExpress bestellt
> hast, zahlst du für **je einen** Artikel weniger als hier steht; die Liste rechnet
> bewusst mit dem Regulärpreis.

> **Varianten prüfen.** Bei mehrdimensionalen Artikeln (Strips, MOSFETs, Motoren)
> steht die geprüfte Variante beim Preis. «1pc / 5pcs / 10pcs», «IP30 / IP65» und
> «5V / 12V» ändern den Preis deutlich – das ist bei diesen Artikeln wichtiger als
> der Titel.

---

## 🇨🇳 Gruppe A · ESP32 — ≈ CHF 47

| Menge | Artikel | CHF/Stk | Total | Angebot |
|---|---|---|---|---|
| 10 | ESP32 DevKit ⚠️ **38 Pin, ESP-WROOM-32** | **1.91 bestätigt** (Regulärpreis) · 4.8★ · 1000+ · **Versand gratis** | 19.10 | [ESP-WROOM-32 DevKitC 38PINS](https://de.aliexpress.com/item/1005007059778300.html) – Realpoy Module Wholesale Store |
| | *Sicherere Alternative, mehr Verkäufe* | 4.17 **bestätigt** · 4.8★ · 4000+ | 41.70 | [ESP-32 30/38-Pin CP2102](https://de.aliexpress.com/item/1005006220389074.html) |
| 10 | Schraubklemmen-Breakout (38 Pin) | 2.83 **bestätigt** · Versand gratis · 4.8★ · 900+ | 28.30 | [ESP-32S 38pin Anschluss-Schraube-Board](https://de.aliexpress.com/item/1005006026098254.html) – Ziqqucu |

> **Der Schraubklemmen-Breakout heisst auf AliExpress «GPIO 1 in 2» oder «1 zu 2»** –
> nicht «screw terminal». Deshalb war er über neun Suchen hinweg unauffindbar.
>
> ⚠️ **Boards und Breakouts beim selben Verkäufer bestellen.** Die 38-Pin-Boards gibt
> es in zwei Platinenbreiten («schmal» und «breit»). Passt die Breite nicht, sitzt
> das Board nicht auf dem Breakout. Beim selben Verkäufer passt es garantiert – und
> es ist ohnehin ein Paket weniger.

### Ein Verkäufer für Board **und** Breakout — geprüft 18.09.2026

Drei Händler führen beides. Alle Preise sind Regulärpreise von der Produktseite.

| Verkäufer | Board | Breakout | 10 + 10 |
|---|---|---|---|
| **Shop1104003965** | [1005008981904299](https://de.aliexpress.com/item/1005008981904299.html) 1.84 (1000+) · [1005008806241325](https://de.aliexpress.com/item/1005008806241325.html) 2.15 (800+) | [1005008806055319](https://de.aliexpress.com/item/1005008806055319.html) 2.54 «38PIN schmale Version» (700+) | **≈ 44–47** |
| **Simple Robot Store** | [1005004476867346](https://de.aliexpress.com/item/1005004476867346.html) 3.42 (10 000+) | [1005004478557343](https://de.aliexpress.com/item/1005004478557343.html) 2.21 «38-PIN Schmalversion» (900+) | ≈ 56 |
| Realpoy (Board oben) | 1005007059778300 · 1.91 | [1005007059651484](https://de.aliexpress.com/item/1005007059651484.html) 2.30 – ⚠️ **nur 3 auf Lager** | ✗ |

⚠️ **Realpoy scheitert am Lagerbestand**, obwohl es der billigste Weg wäre: der
passende Schraubklemmen-Breakout (per Screenshot verifiziert: grüne Platine,
Schraubklemmen beidseitig, «TERMINAL ADAPTER») hat nur **3 Stück**. Realpoys
Alternative [1005007059482676](https://de.aliexpress.com/item/1005007059482676.html)
(CHF 1.94) ist per Screenshot als **Stiftleisten-Board ohne Schraubklemmen**
entlarvt – nicht bestellen.

**Empfehlung: Shop1104003965.** Billigste Kombination und beide Artikel auf Lager.
Noch zu prüfen: der Preis 1.84 gilt für die Standardvariante «Expansion Board 30P» –
**die 38P-Variante muss beim Bestellen explizit gewählt werden**, ihr Preis ist
noch nicht bestätigt. Das zweite Board (2.15) ist bereits 38-Pin.
>
> Teurere Alternative mit Status-LEDs und mehreren 5-V-/3,3-V-Abgriffen:
> [Freenove Terminal Block Shield, CHF 16.76](https://de.aliexpress.com/item/1005005879655901.html)
> – für 10 Stationen mit CHF 168 zu teuer, aber gut für die eine Station, an der du
> am meisten steckst.

> Zum Vergleich: **Bastelgarage** verlangt für ein ESP32-DevKit CHF 15–18 pro Stück.
> Die 10 Boards würden in der Schweiz rund CHF 160 kosten.

---

## 🇨🇳 Gruppe B · Allgemeine Elektronik — ≈ CHF 108

**Das Bündel-Paket.** 20 Positionen, die jeder grössere Elektronik-Händler führt.

### B1 · Kleinsensoren — ≈ CHF 22

| Menge | Artikel | CHF/Stk | Total | Angebot |
|---|---|---|---|---|
| 10 | Reed-/Magnetkontakt MC-38, verdrahtet | 0.28 **bestätigt** · 4.9★ · 4000+ | 2.80 | [MC-38 Tür-/Fenstersensor](https://de.aliexpress.com/item/1005005770705170.html) |
| 20 | Mikroschalter Rollenhebel KW11/KW12 | 2.74 / 10 Stk **bestätigt** · Versand gratis · 4.9★ · 3000+ | 5.48 | [10 Stk Mini-Endschalter SPDT](https://de.aliexpress.com/item/32966619156.html) |
| 10 | Hall-Sensor-Modul KY-003 (A3144) | 0.49 **bestätigt** · 4.9★ | 4.90 | [KY-003 Hall-Modul](https://de.aliexpress.com/item/1005008375336549.html) |
| 10 | TTP223 Touch-Sensor | 0.17 **bestätigt** · 4.8★ · 4000+ | 1.70 | [TTP223 Touch-Modul](https://de.aliexpress.com/item/10000007953784.html) |
| 4 | SW-420 Vibrationssensor | 0.60 **bestätigt** · 4.7★ | 2.40 | [TZT SW-420](https://de.aliexpress.com/item/32835844366.html) |
| 10 | LDR-Modul ⚠️ **4-Pin, LM393, mit `D0`** | 0.30 **bestätigt** · 4.8★ · 2000+ | 3.00 | [Fotowiderstand-Modul 4pin LM393](https://de.aliexpress.com/item/1005002327161114.html) |
| 5 | RCWL-0516 Mikrowellen-Radar | 0.39 **bestätigt** · 4.7★ · 900+ | 1.95 | [RCWL-0516](https://de.aliexpress.com/item/32704946341.html) |

### B2 · Grosssensoren — ≈ CHF 20 (+ 5.94 Versand)

| Menge | Artikel | CHF/Stk | Total | Angebot |
|---|---|---|---|---|
| 5 | E18-D80NK IR-Reflexlichtschranke ⚠️ NPN/NO | 2.37 **bestätigt** · ⚠️ **Versand CHF 5.94**, Okt 06–17 · 4.9★ · 500+ | 11.85 + 5.94 | [E18-D80NK 3–80 cm](https://de.aliexpress.com/item/1005006102521831.html) |
| 2 | IR-Barriere, Sender + Empfänger | 2.86 **bestätigt** · 4.2★ · 1000+ | 5.72 | [Einzelstrahl-Infrarot-Barriere](https://de.aliexpress.com/item/1005005978321872.html) |
| 5 | RC522 RFID-Leser + Tags | 0.56 **bestätigt** · 4.8★ · 5000+ | 2.80 | [RC522 Kit mit Tags](https://de.aliexpress.com/item/1005006440663319.html) |

### B3 · Adapter & Treiber — ≈ CHF 16

| Menge | Artikel | CHF/Stk | Total | Angebot |
|---|---|---|---|---|
| 10 | PCF8574 I/O-Expander | 0.58 **bestätigt** · 4.9★ · 1000+ | 5.80 | [TZT PCF8574 Modul](https://de.aliexpress.com/item/1005009188039073.html) |
| 8 | IRF520 MOSFET-Modul | **10er-Pack CHF 5.23 bestätigt** (5er 3.04) · Versand gratis · 4.9★ · 900+ | 5.23 | [IRF520 MOS-Treiber 5/10 Stk](https://de.aliexpress.com/item/1005006157177189.html) |
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
| 10 | 12-V-COB-LED-Modul | 5.49 / 10 Stk **bestätigt** · Versand gratis · 4.9★ · 10 000+ | 5.49 | [12 V COB-LED-Module, 10 Stk, IP65](https://de.aliexpress.com/item/1005008406091646.html) |
| 1 | Stroboskop 12 V LED | 1.19 **bestätigt** · 4.7★ · 3000+ | 1.19 | [12-LED-Stroboskop 12–24 V](https://de.aliexpress.com/item/1005008034979845.html) |
| 1 | Relaismodul 8-Kanal ⚠️ **5 V + Optokoppler** | ≈ 4–5 **Variante wählen** · 4.7★ · 4000+ | ≈ 4.50 | [1/2/4/6/8-Kanal Relais 5 V Optokoppler](https://de.aliexpress.com/item/1005006280813881.html) |
| 5 | Relaismodul 2-Kanal 5 V | 1.32 **bestätigt** · 4.7★ · 4000+ | 6.60 | *dasselbe Angebot, Variante «2 Kanal 5V»* |

### B6 · Verbrauchsmaterial — ≈ CHF 8

| Menge | Artikel | CHF | Angebot |
|---|---|---|---|
| 100 | 1N4007 Dioden ⚠️ **Freilauf an jede Spule – Pflicht** | 1.47 **bestätigt** · 4.9★ · 3000+ | [100 Stk 1N4007 1 A 1000 V DO-41](https://de.aliexpress.com/item/1005006454795578.html) |
| 10 | Elko 1000 µF / 16 V (an jeden LED-Strip-Anfang) | 1.87 **bestätigt**, **Staffel: 0.96 ab 10 Stk** · Versand gratis · 4.9★ | [Elektrolytkondensatoren, Wert wählen](https://de.aliexpress.com/item/1005005691916127.html) |
| 600 | Widerstandssortiment ¼ W, 1 %, 30 Werte | 2.97 **bestätigt** · Versand gratis · 4.9★ · 2000+ | [600 Stk Metallfilm-Widerstandsset](https://de.aliexpress.com/item/1005006179281226.html) |
| 120 | Dupont-Kabel-Set (M-M, M-F, F-F) | 2.92 **bestätigt** · Versand gratis · 4.9★ · 3000+ | [Dupont 40–120 Stk, 10/20/30 cm](https://de.aliexpress.com/item/1005005364298980.html) |

---

## 🇨🇳 Gruppe C · LED-Strips — ≈ CHF 52

| Menge | Artikel | CHF/Stk | Total | Angebot |
|---|---|---|---|---|
| 2 | WS2812B 5 m, 30 LED/m, ⚠️ **5 V, IP30** | **18.56 bestätigt** für Variante «Black PCB IP30 / 30LEDs-M / 5m» · Versand gratis · 4.8★ · 5000+ | 37.12 | [WS2812B 5 V 30/60/144 LED, 1–5 m](https://de.aliexpress.com/item/1005009580843710.html) |
| 2 | UV-LED-Strip 5 m, 395 nm, ⚠️ **12 V** | 14.96 **bestätigt** für «5m EU Plug» · ⚠️ **nur 1 Stk auf Lager** · 4.5★ | — | [UV-Strip 5 M DC12V 385–400 nm](https://de.aliexpress.com/item/1005009512141454.html) |
| 2 | *Alternative UV* | 7.28 **bestätigt** für «White PCB / IP20 / 60LEDs-M» · Versand CHF 1.57 · ⚠️ **Wellenlänge nicht wählbar** · 5.0★ | 14.56 + 1.57 | [5 m 12 V UV 365/395 nm IP20/IP65](https://de.aliexpress.com/item/2037523901.html) |

> ⚠️ **WS2812B: 18.56, nicht 11.42.** Der Listenpreis war der der 1-m-Variante.
> Bestätigt am 18.09.2026 durch Anklicken der Variante auf der Produktseite.
> Die **weisse Platine ist in 5 m ausverkauft**, ebenso 144 LED/m in 5 m – schwarze
> Platine nehmen, in einer Geisterbahn ohnehin besser, weil sie nicht spiegelt.

> ⚠️ **UV-Strip: beide Angebote haben einen Haken.** Das erste hat nur noch
> **1 Stück** auf Lager (du brauchst 2) und enthält ein Steckernetzteil, das du
> nicht brauchst. Beim zweiten lässt sich die **Wellenlänge nicht wählen** – der
> Titel nennt 365 nm *und* 395 nm, es gibt aber nur Varianten für Platinenfarbe,
> IP-Klasse und LED-Dichte. 365 nm leuchtet kaum sichtbar und bringt für
> Schwarzlicht-Effekte nichts. **Vor dem Kauf beim Verkäufer nachfragen** oder eines
> der Angebote unten nehmen, die 395–405 nm im Titel führen:
> [33032788373](https://de.aliexpress.com/item/33032788373.html) (Gratisversand, 4.4★),
> [1005005812239262](https://de.aliexpress.com/item/1005005812239262.html) (Gratisversand, 4.9★),
> [33025833609](https://de.aliexpress.com/item/33025833609.html) (5.0★).
> Diese drei sind noch nicht auf Variantenpreise geprüft.

> Viele LED-Händler führen WS2812B **und** UV – prüf beim Bestellen, ob dein
> WS2812B-Verkäufer auch den UV-Strip hat. Dann wird aus C ein einziges Paket.

> Zum Vergleich: **Bastelgarage** verkauft 0.33 m WS2812B für CHF 4.50 – das wären
> rund CHF 68 pro 5 m.

---

## 🇨🇳 Gruppe D · Motoren & Magnete — ≈ CHF 18

| Menge | Artikel | CHF/Stk | Total | Angebot |
|---|---|---|---|---|
| 1 | JGY-370 Schneckengetriebemotor 12 V ⚠️ **20–40 U/min wählen** | **3.36 bestätigt – für jede Drehzahl gleich** · ⚠️ Versand CHF 5.95, Sep 30–Okt 12 · 4.8★ · 5000+ | 3.36 + 5.95 | [ZGY370/JGY370 4632 6/12/24 V](https://de.aliexpress.com/item/1005004615731578.html) |
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

> ✅ **Die befürchtete Drehzahl-Falle gibt es bei diesem Händler nicht.** Geprüft am
> 18.09.2026: 1, 20, 30 und 100 U/min sowie 6, 12 und 24 V kosten alle **CHF 3.36**.
> Also ohne Zögern 20 oder 30 U/min wählen. Der Haken liegt woanders: **Versand
> CHF 5.95** und Lieferung erst Sep 30 – Okt 12. Weil Gruppe D zuerst raus soll,
> ist das gerade noch vertretbar – aber bestelle bei diesem Händler gleich die
> Magnete mit, sonst zahlst du den Versand zweimal.

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

**AliExpress Ware total ≈ CHF 234 + CHF 13 Versand ≈ CHF 247**

Aufstellung: A 47 · B 108 · C 52 · D 18 · Arcade 9.
Versand fällt nur bei drei Positionen an: E18-D80NK 5.94 · JGY-370 5.95 ·
UV-Strip-Alternative 1.57. Alles andere ist gratis.

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

### 1 · Versandkosten — erledigt

✅ **Ermittelt am 18.09.2026.** Von der lokalen Session aus sind die Produktseiten
lesbar; die Sperre hing an der Rechenzentrums-IP der Cloud-Session, nicht am
Navigationsweg. Ergebnis: **Gratisversand ist bei diesen Händlern die Regel.** Nur
drei Positionen kosten Versand, alle drei sind oben mit ⚠️ markiert.

Was nach wie vor gilt: die Preise sind pro Position beim jeweiligen Händler geprüft.
Bündelst du um, **ändert sich der Versand mit** – im Warenkorb gegenprüfen.

### 2 · Noch nicht auf Variantenpreise geprüft

| Position | Was fehlt |
|---|---|
| Relaismodul 8-Kanal `1005006280813881` | Preis der Variante «8 Kanal 5V». Die Standardvariante zeigt 1.56 regulär; die Kanal-Varianten sind Bild-Kacheln und wurden von der AliExpress-Drosselung blockiert. Schätzung ≈ 4–5. |
| Board `1005008981904299` (Shop1104003965) | Preis der 38P-Variante; 1.84 gilt für «Expansion Board 30P». |
| UV-Alternativen `33032788373`, `1005005812239262`, `33025833609` | Variantenpreise und ob 395–405 nm wirklich wählbar ist. |
| Elko `1005005691916127` | Der bestätigte Preis gilt für die Standardvariante «25V 330µF, 10 Stk». Für **1000 µF / 16 V** die Variante wählen und den Preis gegenprüfen; die Staffel **0.96 ab 10 Stück** greift dort vermutlich auch. |
| 7 TZT-Positionen | SW-420, COB-LED, Stroboskop, Relais, 1N4007, Elko, Widerstandsset – ob TZT sie führt, ist wegen Netzwerkfehlern offen. Betrifft nur die Bündelung, nicht die Preise. |

### 3 · Nebelmaschinen-Fernbedienung

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
