# 11 – Einkaufsliste FINAL

**Stand 18.09.2026.** Ersetzt `09-einkaufsliste.md`.
**Preise direkt bei AliExpress abgerufen** (Währung CHF, Lieferland Schweiz).
Die mit **bestätigt** markierten Positionen stammen von der **Produktseite** –
inklusive Variante, Versand und Lagerbestand. Der Rest kommt aus der Trefferliste.

| | CHF |
|---|---|
| AliExpress (Ware, inkl. Breakouts) | **264** |
| Versandkosten AliExpress | **12** – nur 2 Positionen kosten Versand |
| Baumarkt | ≈ 40 |
| Netzteile, SD-Karten | **0** – vorhanden |
| **Total** | **≈ 316** |

> **Noch CHF 63 unter der alten Schätzung von CHF 379** – aber die erste Fassung
> dieser Liste (≈ 214 + offener Versand) war zu optimistisch. Alle Preise sind
> jetzt Regulärpreise von der Produktseite, mit der richtigen Variante.

**Was zwischen 214 und 264 passiert ist** – vier Positionen, nichts davon vermeidbar:

| | alt | neu | warum |
|---|---|---|---|
| ESP32 + Breakout | 47 | **58** | Die billigen Kombinationen waren **30-Pin-Boards**. Ein Verkäufer mit echtem 38-Pin-Board *und* passendem Breakout kostet mehr. |
| WS2812B, 2 Rollen | 22.84 | **37.12** | Der alte Preis war die **1-m-Variante**, nicht 5 m. |
| UV-Strip, 2 Rollen | 16.13 | **27.30** | Die billigen Angebote lassen **Wellenlänge oder Spannung nicht wählen**. |
| Relais | 11.10 | **17.76** | Der alte Preis galt für «1 Channel 24V», nicht für 8- und 2-Kanal in 5 V. |

---

## Warum jetzt 4 Bestellungen statt 9

**Ein Paket = ein Verkäufer.** AliExpress versendet pro Verkäufer, nicht pro
Warenkorb. Die Zahl der Pakete bestimmst du also nicht durch die Aufteilung der
Liste, sondern dadurch, bei wie vielen verschiedenen Verkäufern du bestellst.

Die alte Aufteilung in 9 thematische Pakete kam von der **Zollgrenze CHF 62**.
Die Begründung dafür war falsch – bei CHF 264 Warenwert liegen die Gruppen B (115)
und C (64) klar *über* der Grenze, nicht darunter. Der Punkt ist ein anderer:
**AliExpress erhebt die Schweizer MwSt. bereits an der Kasse** – die Produktseiten
weisen «Preis inkl. MwSt.» aus. Damit fällt an der Grenze keine Einfuhrsteuer und
keine Verzollungsgebühr der Post an, und die Paketgrösse ist steuerlich irrelevant.
Die Themen-Pakete haben also tatsächlich keinen Zweck mehr, nur aus einem anderen
Grund als bisher notiert.

Die Liste ist jetzt nach **Verfügbarkeit** gruppiert statt nach Thema:

| | Gruppe | ≈ CHF | Warum eigener Verkäufer |
|---|---|---|---|
| **A** | ESP32-Boards + Breakouts | 58 | ESP-Spezialisten; Board und Breakout müssen zueinander passen |
| **B** | Alles Allgemeine: Sensoren, Module, Treiber, Servos, Ton, Relais, Verbrauchsmaterial | 115 | führt **jeder** grössere Elektronik-Händler |
| **C** | LED-Strips (WS2812B, UV) | 64 | LED-Händler, Meterware |
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

### Ergebnis der Bündelungs-Prüfung (18.09.2026)

**TZT 123 Official Store ist der Anker – aber B wird nicht ein Paket.**

Drei Positionen der Liste kommen schon von TZT: **SW-420**, **PCF8574** und die
**E18-D80NK**. Und TZT ist der einzige Händler in Gruppe B, der überhaupt Versand
verlangt: **CHF 5.93**, bestätigt auf zwei Produktseiten. AliExpress rechnet Versand
**pro Händler und Sendung** ab, nicht pro Artikel – die 5.93 sind also schon bezahlt,
und **jede weitere TZT-Position fährt versandkostenfrei mit.** Das dreht die
Bündelungs-Logik: Bündeln spart hier kein Geld (alle anderen liefern gratis), sondern
**Pakete**. Der Hebel ist, möglichst viel in die eine TZT-Sendung zu legen, die du
ohnehin hast.

**Sicher nicht bei TZT** – null Treffer im Sortiment: **74AHCT125 · DFPlayer Mini ·
Stroboskop 12 V · Arcade-Taster**. Dazu aus der früheren Prüfung: Reed MC-38, LDR-Modul.
Damit bleiben mindestens **2 Restpakete**, egal wie gut der Rest zusammenpasst.

**Scheintreffer, die der Stichwortfilter gemeldet hat und die keine sind** – ich habe
die Titel einzeln gelesen: der «COB-LED»-Treffer ist ein 10–100-W-Flutlicht-COB-Chip
und eine W5W-Autolampe, nicht das 12-V-Modul · «IRF520» sind **nackte MOSFETs**, nicht
das Treibermodul · «SG90/MG996R» sind **Metallgetriebe-Sets**, keine Servos · der
billige «LM2596» ist ein MP1584/MINI360. Diese vier bleiben, wo sie sind.

> ⚠️ **Die alte Zahl «15 von 28» war zu optimistisch** und stammte aus demselben
> Stichwortfilter. Relevanz nach Suchwort ist nicht dasselbe wie das richtige Bauteil.

**Echte TZT-Kandidaten – Preise noch NICHT bestätigt.** Diese Angebote sind vom Titel
her das richtige Bauteil, aber die Preise stammen aus der Shop-Trefferliste, gelten für
die **billigste Variante** und sind auf der Produktseite nicht gegengeprüft (die
AliExpress-Sperre hat mich am Abend des 18.09. gestoppt). **Vor dem Umbuchen im
Warenkorb selbst prüfen:**

| Position | TZT-Angebot | TZT *geschätzt* | aktuell in der Liste |
|---|---|---|---|
| Elko 1000 µF / 16 V | [1005005944252448](https://de.aliexpress.com/item/1005005944252448.html) «10/50 Stk 1000 µF 16 V» | *≈ 0.92* | 2.33 **bestätigt** (IBUW) |
| Dupont-Kabel-Set | [4000812552635](https://de.aliexpress.com/item/4000812552635.html) M-M + F-M + F-F | *≈ 0.98* | 2.92 **bestätigt** |
| Relaismodul 5 V | [32787386713](https://de.aliexpress.com/item/32787386713.html) 1/2/4/6/8-Kanal Optokoppler | *≈ 1.04* ⚠️ | 6.26 / 2.30 **bestätigt** (YouKeyi) |
| Lautsprecher 3 W | [1005010728678265](https://de.aliexpress.com/item/1005010728678265.html) 3525/2535 | *≈ 1.04* | 1.12 **bestätigt** |
| Widerstandsset 600 | [1005008786731033](https://de.aliexpress.com/item/1005008786731033.html) | **2.95 bestätigt** | 2.97 **bestätigt** |
| PAM8403 | [1005008157267328](https://de.aliexpress.com/item/1005008157267328.html) | *≈ 1.01* | 0.90 **bestätigt** → **teurer** |

⚠️ **Beim Relais ist die 1.04 mit Sicherheit die 1-Kanal-Variante** – genau die Falle,
die beim YouKeyi-Angebot schon zugeschlagen hat (Listenpreis 1.56 galt für «1 Channel
24V», echt sind 6.26 für 8-Kanal). Erwarte bei TZT keine Ersparnis, bis du die
Variantenpreise gesehen hast.

**Was das praktisch heisst:** Das Widerstandsset zu TZT umbuchen kostet nichts und
spart ein Paket (2.95 statt 2.97, Versand schon bezahlt). Elko und Dupont sehen nach
je gut CHF 1.40 bzw. 1.90 Ersparnis aus – **wenn** sich die Variantenpreise halten.
Mehr als das gibt TZT nicht her.

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

## 🇨🇳 Gruppe A · ESP32 — ≈ CHF 58

**Beides bei Simple Robot Store — ein Verkäufer, ein Paket, Gratisversand.**

| Menge | Artikel | CHF/Stk | Total | Angebot |
|---|---|---|---|---|
| 10 | ESP32 DevKit ⚠️ Variante **`TYPE-C-CP2102-38PIN`** | **3.56 bestätigt** · Versand gratis, Sep 25–30 · 4.7★ · 10 000+ | 35.60 | [ESP32-DevKitC-32 ESP-WROOM](https://de.aliexpress.com/item/1005004476867346.html) – Simple Robot Store |
| 10 | Schraubklemmen-Breakout, **38-Pin Schmalversion** | **2.20 bestätigt** · Versand gratis, Sep 25–30 · 4.8★ · 900+ | 22.00 | [Breakout GPIO 1 zu 2, 38-PIN](https://de.aliexpress.com/item/1005004478557343.html) – Simple Robot Store |

Bildkontrolle 18.09.2026: der Breakout ist grün, hat **Schraubklemmen an beiden
Längsseiten** und den Aufdruck «TERMINAL ADAPTER» — das ist der richtige Typ. Der
Verkäufer führt denselben Adapter zusätzlich als Variante `Adapter 38P` im
Board-Angebot (2.42), also teurer als das Einzelangebot — nimm das Einzelangebot.

**Die billigere Alternative, die du nicht nehmen solltest:**

| Menge | Artikel | CHF/Stk | Total | Angebot |
|---|---|---|---|---|
| 10 | ESP32 DevKit 38 Pin | 1.91 **bestätigt** · Versand gratis · 4.8★ · 1000+ | 19.10 | [ESP-WROOM-32 DevKitC 38PINS](https://de.aliexpress.com/item/1005007059778300.html) – Realpoy |
| 10 | Schraubklemmen-Breakout 38 Pin | 2.83 **bestätigt** · Versand gratis · 4.8★ · 900+ | 28.30 | [ESP-32S 38pin Schraube-Board](https://de.aliexpress.com/item/1005006026098254.html) – Ziqqucu |

Das wären **CHF 47.40 statt 57.60**, also CHF 10 günstiger. Dafür zwei Verkäufer,
zwei Pakete — und, das ist der eigentliche Punkt, **niemand garantiert, dass
Realpoys Board auf Ziqqucus Breakout passt.** Genau diese Unsicherheit wolltest du
weghaben. CHF 10 für Passgarantie und ein Paket weniger ist der bessere Tausch.

> **Der Schraubklemmen-Breakout heisst auf AliExpress «GPIO 1 in 2» oder «1 zu 2»** –
> nicht «screw terminal». Deshalb war er über neun Suchen hinweg unauffindbar.
>
> ⚠️ **Boards und Breakouts beim selben Verkäufer bestellen.** Die 38-Pin-Boards gibt
> es in zwei Platinenbreiten («schmal» und «breit»). Passt die Breite nicht, sitzt
> das Board nicht auf dem Breakout. Beim selben Verkäufer passt es garantiert – und
> es ist ohnehin ein Paket weniger.

### Warum die anderen Kandidaten ausfallen — geprüft 18.09.2026

| Verkäufer | Warum nicht |
|---|---|
| **Realpoy** | Führt beides und wäre der billigste Weg, aber der passende Breakout [1005007059651484](https://de.aliexpress.com/item/1005007059651484.html) hat **nur 3 Stück** auf Lager. Realpoys Alternative [1005007059482676](https://de.aliexpress.com/item/1005007059482676.html) ist per Bildkontrolle ein **Stiftleisten-Board ohne Schraubklemmen** – nicht bestellen. |
| **Shop1104003965** | Das billige Board [1005008981904299](https://de.aliexpress.com/item/1005008981904299.html) (1.84) hat **ausschliesslich 30P-Varianten**, kein 38-Pin – passt nicht auf das Breakout. Das zweite Board [1005008806241325](https://de.aliexpress.com/item/1005008806241325.html) kostet regulär 2.63 (nicht 2.15) und nennt in den Varianten ebenfalls nur «30PIN». Damit ist der Shop erledigt. |
| **Ziqqucu** | Führt nur Breakouts, keine Boards. |

Das ist auch der Grund, warum es teurer wurde als in der ersten Fassung gedacht:
die günstigen Kombinationen waren **30-Pin-Boards**, und die passen nicht.

> Teurere Alternative mit Status-LEDs und mehreren 5-V-/3,3-V-Abgriffen:
> [Freenove Terminal Block Shield, CHF 16.76](https://de.aliexpress.com/item/1005005879655901.html)
> – für 10 Stationen mit CHF 168 zu teuer, aber gut für die eine Station, an der du
> am meisten steckst.

> Zum Vergleich: **Bastelgarage** verlangt für ein ESP32-DevKit CHF 15–18 pro Stück.
> Die 10 Boards würden in der Schweiz rund CHF 160 kosten.

---

## 🇨🇳 Gruppe B · Allgemeine Elektronik — ≈ CHF 115

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

### B5 · 12-V-Licht & Relais — ≈ CHF 24

| Menge | Artikel | CHF/Stk | Total | Angebot |
|---|---|---|---|---|
| 10 | 12-V-COB-LED-Modul | 5.49 / 10 Stk **bestätigt** · Versand gratis · 4.9★ · 10 000+ | 5.49 | [12 V COB-LED-Module, 10 Stk, IP65](https://de.aliexpress.com/item/1005008406091646.html) |
| 1 | Stroboskop 12 V LED | 1.19 **bestätigt** · 4.7★ · 3000+ | 1.19 | [12-LED-Stroboskop 12–24 V](https://de.aliexpress.com/item/1005008034979845.html) |
| 1 | Relaismodul 8-Kanal ⚠️ Variante **`8 Channel 5V`** | **6.26 bestätigt** · Versand gratis, Sep 27–Okt 02 · 4.7★ · 4000+ | 6.26 | [1/2/4/6/8-Kanal Relais 5 V Optokoppler](https://de.aliexpress.com/item/1005006280813881.html) – YouKeyi Store |
| 5 | Relaismodul 2-Kanal ⚠️ Variante **`2 Channel 5V`** | **2.30 bestätigt** · Versand gratis · 4.7★ · 4000+ | 11.50 | *dasselbe Angebot* |

> ⚠️ **Relais: teurer als angesetzt.** Die Variantenpreise sind CHF 6.26 für
> 8-Kanal (statt geschätzt 4.50) und **2.30 für 2-Kanal statt 1.32** – der alte Wert
> kam aus der Trefferliste und galt für die Standardvariante «1 Channel 24V»
> (1.56). Alle Varianten, bestätigt am 18.09.2026: 2-Kanal 2.30 · 4-Kanal 3.54 ·
> 8-Kanal 6.26, jeweils 5 V, Gratisversand.
>
> *Sparoption, falls es dir passt:* Zwei 4-Kanal-Module (2 × 3.54 = 7.08) statt
> fünf 2-Kanal-Modulen (11.50) sind CHF 4.40 billiger. Dafür sitzen die Relais
> nicht mehr bei der Station, sondern zentral – mehr 12-V-Kabel. Dein Entscheid;
> die Liste rechnet mit den fünf einzelnen.

### B6 · Verbrauchsmaterial — ≈ CHF 10

| Menge | Artikel | CHF | Angebot |
|---|---|---|---|
| 100 | 1N4007 Dioden ⚠️ **Freilauf an jede Spule – Pflicht** | 1.47 **bestätigt** · 4.9★ · 3000+ | [100 Stk 1N4007 1 A 1000 V DO-41](https://de.aliexpress.com/item/1005006454795578.html) |
| 10 | Elko 1000 µF / 16 V (an jeden LED-Strip-Anfang) ⚠️ Variante **`16V1000UF-10PCS`** | **2.33 bestätigt** für das 10er-Pack · Versand gratis, Sep 27–Okt 02 · 4.9★ | [Elektrolytkondensatoren, Wert wählen](https://de.aliexpress.com/item/1005005691916127.html) – IBUW |
| 600 | Widerstandssortiment ¼ W, 1 %, 30 Werte | 2.97 **bestätigt** · Versand gratis · 4.9★ · 2000+ | [600 Stk Metallfilm-Widerstandsset](https://de.aliexpress.com/item/1005006179281226.html) |
| 120 | Dupont-Kabel-Set (M-M, M-F, F-F) | 2.92 **bestätigt** · Versand gratis · 4.9★ · 3000+ | [Dupont 40–120 Stk, 10/20/30 cm](https://de.aliexpress.com/item/1005005364298980.html) |

> **Elko: 2.33, nicht 1.87.** Der alte Wert galt für die Standardvariante
> «25V 330 µF». Die richtige Variante `16V1000UF-10PCS` kostet 2.33 pro **10er-Pack**
> – ein Pack reicht für alle 10 Strip-Anfänge. Staffel bei diesem Wert: 1.35 ab 3
> Packs, 1.28 ab 5, 1.21 ab 10 – für dich irrelevant, du brauchst eines.

---

## 🇨🇳 Gruppe C · LED-Strips — ≈ CHF 64

| Menge | Artikel | CHF/Stk | Total | Angebot |
|---|---|---|---|---|
| 2 | WS2812B 5 m, 30 LED/m, ⚠️ **5 V, IP30** | **18.56 bestätigt** für Variante «Black PCB IP30 / 30LEDs-M / 5m» · Versand gratis · 4.8★ · 5000+ | 37.12 | [WS2812B 5 V 30/60/144 LED, 1–5 m](https://de.aliexpress.com/item/1005009580843710.html) |
| 2 | UV-LED-Strip 5 m, **395–405 nm, 12 V** ⚠️ Variante **`5M 12V 5050 60leds`** | **13.65 bestätigt** · Versand gratis, Sep 27–Okt 05 · 4.9★ | 27.30 | [UV 395–405 nm, 5 V/12 V, 60/120 LED/m](https://de.aliexpress.com/item/1005005812239262.html) – Dream Lighting Store |

> ⚠️ **WS2812B: 18.56, nicht 11.42.** Der Listenpreis war der der 1-m-Variante.
> Bestätigt am 18.09.2026 durch Anklicken der Variante auf der Produktseite.
> Die **weisse Platine ist in 5 m ausverkauft**, ebenso 144 LED/m in 5 m – schwarze
> Platine nehmen, in einer Geisterbahn ohnehin besser, weil sie nicht spiegelt.

> ✅ **UV-Strip: gelöst, aber teurer.** Die beiden alten Kandidaten hatten je einen
> Haken – [1005009512141454](https://de.aliexpress.com/item/1005009512141454.html)
> hat **nur 1 Stück** auf Lager (du brauchst 2) und ein unnötiges Steckernetzteil,
> und bei [2037523901](https://de.aliexpress.com/item/2037523901.html) (7.28) liess
> sich die **Wellenlänge nicht wählen**: der Titel nennt 365 nm *und* 395 nm, die
> Varianten nur Platinenfarbe, IP-Klasse und LED-Dichte. 365 nm leuchtet kaum
> sichtbar und bringt für Schwarzlicht nichts.
>
> Das eingetragene Angebot löst beides: der Titel nennt **395–405 nm**, und
> **Spannung und Länge sind explizit wählbar** – Variante `5M 12V 5050 60leds`,
> bestätigt CHF 13.65, Gratisversand, 4.9★. Das kostet CHF 27.30 für zwei Rollen
> statt 14.56 + 1.57, also gut CHF 11 mehr. Dafür weisst du, was du bekommst.
>
> *Billigere Option mit Restrisiko:*
> [33025833609](https://de.aliexpress.com/item/33025833609.html) (Seven Bears, 5.0★)
> kostet in «60 LEDs / IP20 / 5 m» nur **CHF 7.10 bestätigt**, Gratisversand – aber
> dort ist die **Spannung keine Variante**, es gibt nur LED-Dichte, IP-Klasse und
> Länge. Ob du 12 V bekommst, ist damit nicht abgesichert. Wenn du CHF 13 sparen
> willst: vorher beim Verkäufer nachfragen.
> [33032788373](https://de.aliexpress.com/item/33032788373.html) war wegen der
> AliExpress-Sperre nicht auslesbar.

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

**AliExpress Ware total CHF 264 + CHF 12 Versand = CHF 276**

Aufstellung: A 57.60 · B 115.10 · C 64.42 · D 17.73 · Arcade 9.00.
Innerhalb B: B1 22.23 · B2 20.37 · B3 16.50 · B4 21.87 · B5 24.44 · B6 9.69.
Versand fällt nur bei **zwei** Händlern an: **TZT** 5.93 (bei der E18-D80NK
eingerechnet) und der **JGY-370-Händler** 5.95. Alles andere ist gratis.

> **Die TZT-5.93 gelten pro Sendung, nicht pro Artikel.** SW-420 und PCF8574 kommen
> ebenfalls von TZT und fahren darin mit – deshalb steht bei ihnen kein Versand.
> Legst du weitere TZT-Positionen dazu, ändert sich der Versand **nicht**.

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
zwei Händler verlangen Versand – TZT und der JGY-370-Händler –, beide sind oben
mit ⚠️ markiert.

Was nach wie vor gilt: die Preise sind pro Position beim jeweiligen Händler geprüft.
Bündelst du um, **ändert sich der Versand mit** – im Warenkorb gegenprüfen.

### 2 · Noch nicht auf Variantenpreise geprüft

Alle Variantenpreise der Hauptpositionen sind geprüft. Es bleiben zwei Kleinigkeiten:

| Position | Was fehlt | Auswirkung |
|---|---|---|
| UV-Alternative `33032788373` | Nicht auslesbar (AliExpress-Sperre). Nur relevant, wenn du beim UV-Strip noch sparen willst. | keine, Hauptangebot steht |
| 3 TZT-Umbuchungen | Elko, Dupont-Set und Relaismodul bei TZT: Bauteil passt laut Titel, **Variantenpreise aber nicht bestätigt** (Sperre). Tabelle unter «Ergebnis der Bündelungs-Prüfung». | bis ≈ CHF 3 billiger und **ein Paket weniger** – oder gar nichts, falls die Varianten teurer sind |

⚠️ **Ein echter Restpunkt bleibt die Platinenbreite.** Board und Breakout kommen beim
empfohlenen Verkäufer aus demselben Shop, und der Breakout heisst ausdrücklich
«38-PIN Schmalversion» – aber ob das Board die schmale oder die breite Bauform ist,
steht nirgends. Aus dem Produktfoto lässt sich das nicht messen. Wenn du auf
Nummer sicher gehen willst: **frag den Verkäufer vor dem Bestellen**, ob Board und
Adapter zusammenpassen. Er verkauft beides, die Antwort kostet ihn nichts.

### 3 · Nebelmaschinen-Fernbedienung

Weiterhin offen: Ist die Fernbedienung abnehmbar (Buchse hinten am Gerät)?
Wenn ja → 2-Kanal-Relais parallel zum Taster, kostet nichts.
Wenn nein → SwitchBot Bot, CHF 20.90, per Bluetooth direkt vom Pi.

---

## Vor dem Absenden prüfen

1. **ESP32 DevKit: Variante `TYPE-C-CP2102-38PIN`.** Die Standardvariante des
   Angebots ist **30PIN** und passt nicht auf das Breakout – das ist die
   wahrscheinlichste Fehlbestellung der ganzen Liste. Board und Breakout beim
   selben Verkäufer bestellen.
2. **UV-Strip: Variante `5M 12V 5050 60leds`.** Nicht die 5-V-Variante, nicht 1 m.
3. **WS2812B: Variante «Black PCB IP30 / 30LEDs-M / 5m».** Wirklich WS2812B, nicht
   WS2811. Weisse Platine ist in 5 m ausverkauft.
4. **Relais: `8 Channel 5V` und `2 Channel 5V`.** Standard ist «1 Channel 24V».
5. **Elko: `16V1000UF-10PCS`.** Standard ist «25V 330 µF».
6. **IRF520: 10er-Pack**, nicht 5er.
7. **JGY-370: 20 oder 30 U/min, 12 V.** Kostet gleich viel wie jede andere Drehzahl.
8. **LDR-Modul: 4 Pins mit `D0` und Poti.** Nur der Digitalausgang umgeht den
   ADC2/WLAN-Konflikt des ESP32 (`10`).
9. **Arcade-Taster: 12-V-Variante**, nicht 5 V.

---

## Bewusst gestrichen

| Artikel | Begründung |
|---|---|
| 433-MHz-Handsender + Empfänger | Nicht gewünscht. Not-Aus steht im Node-RED-Dashboard auf dem Handy (`06`). |
| JGY-370 Reservemotor | Stattdessen: Winde sofort nach Ankunft testen. |
| Netzteile, MicroSD | Aus dem Bestand. |
| Aufteilung in 9 Zoll-Pakete | Bei CHF 264 Warenwert gegenstandslos – die Zollgrenze CHF 62 gilt pro Sendung und wird ohnehin überschritten. Siehe oben. |

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
