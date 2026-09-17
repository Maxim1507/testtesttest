# 10 – Infrastruktur für deine Auswahl

Abgeleitet aus der Auswahl vom 17.09.2026: **75 Sensoren, 45 Aktoren, ca. CHF 224 Teilekosten.**

---

## Pin-Bilanz – warum die Zahl der ESP32 nicht bei 4 landet

| Gruppe | Stück | GPIO-Bedarf |
|---|---|---|
| Einfache Kontakte (Reed 10, Mikro 10, Arcade 4, Hall 10, TTP223 10, SW-420 4) | 48 | 48 |
| LDR-Module (über Digitalausgang D0) | 10 | 10 |
| RCWL-0516 + E18-D80NK + IR-Barriere | 12 | 12 |
| RC522 RFID | 5 | SPI: 4 gemeinsam + 1 CS je Leser |
| Relaiskanäle (8-Kanal + 5× 2-Kanal) | 18 | 18 |
| Servos (10× SG90, 3× MG996R) | 13 | 13 |
| WS2812B-Datenleitungen | 2 | 2 |
| JGY-370 über L298N | 1 | 2 |
| DFPlayer (nur TX nötig) | 5 | 5 |
| **Summe** | | **≈ 110 Pins** |

Ein ESP32 hat realistisch **20–22 sicher nutzbare GPIO** (der Rest ist Flash,
Strapping-Pins oder nur-Eingang). Rein rechnerisch also 6 Boards – praktisch
bestimmt aber die **Verteilung im Keller** die Zahl, nicht die Pins.

→ **8 ESP32 als Stationen + 2 Reserve = 10 Stück.**

---

## Die drei technischen Fallen in genau dieser Auswahl

### 1. Deine 48 Kontakte gehören an einen I/O-Expander, nicht an GPIOs

**PCF8574** (≈ CHF 1): 8 Ein-/Ausgänge über I²C. Bis zu 8 Chips an einem Bus
= **64 Kontakte auf 2 Pins**. ESPHome unterstützt ihn nativ (`pcf8574`-Platform).

Damit schrumpfen deine 58 einfachen Kontakte von 58 Pins auf 2 pro Station.

Zwei Details, die den Unterschied machen:
- **INT-Pin anschliessen.** Der PCF8574 hat einen Interrupt-Ausgang. Hängst du
  den an einen ESP32-GPIO, musst du den Bus nicht pollen – sonst holst du dir
  50–100 ms Latenz.
- **Nur für kurze Leitungen.** Der PCF8574 hat nur schwache interne Pull-ups
  (~100 µA). Für Sensoren über ein paar Meter Kabel nimm einen echten
  ESP32-GPIO mit externem 2.2-kΩ-Pull-up (siehe `02`). Faustregel: Expander für
  alles am Stationstisch, direkter GPIO für alles am langen Kabel.

**Menge: 10 Stück**

### 2. ⚠️ Deine 10 LDR: ADC2 funktioniert am ESP32 nicht mit WLAN

Das ist ein bekannter Hardware-Konflikt: **während WLAN aktiv ist, ist ADC2
blockiert.** Nutzbar bleibt nur ADC1 = GPIO 32, 33, 34, 35, 36, 39 — also
**6 Analogeingänge pro Board**, nicht 15.

Für dein Taschenlampen-Spiel brauchst du aber gar keinen Analogwert: die
LDR-Module haben neben `A0` auch einen **Digitalausgang `D0`** mit Poti für die
Schwelle. Stell das Poti auf "Taschenlampe ja/nein" ein und behandle den LDR
wie einen Taster — dann geht er auch an den PCF8574.

Analogeingang nur nehmen, wenn du wirklich Helligkeit *messen* willst.

### 3. Freilaufdioden an Hubmagnet und Haftmagnet sind nicht optional

2× Hubmagnet, 2× Haftmagnet = 4 Spulen. Beim Abschalten erzeugt jede eine
Spannungsspitze, die den Transistor zerstört bzw. Relaiskontakte verschweisst.
**1N4007 antiparallel zur Spule**, Kathode (Ring) an Plus.

Und: die Magnete gehören nicht an Relais, sondern an **MOSFET-Module (IRF520)**:
- Relais schalten mit ~10 ms Verzögerung – dein freier Fall wird unsauber
- Relaiskontakte verschleissen bei hunderten Klopf-Impulsen pro Abend
- Der MOSFET schaltet in < 1 ms und hält beliebig viele Zyklen aus

**Menge: 8 MOSFET-Module** (4 Spulen + Reserve + LED-Dimmung)

---

## Strombilanz

| Schiene | Verbraucher | Spitze | Netzteil |
|---|---|---|---|
| **12 V** | 10× COB-LED (2.5 A), 2× UV-Strip (3 A), Stroboskop (1 A), 2× Hubmagnet (2 A), 2× Haftmagnet (0.6 A), JGY-370 (1–3 A) | ≈ 10 A | **12 V / 10 A** |
| **5 V LED** | 2× WS2812B à 150 LEDs, gedimmt und farbig | 3–4 A | **5 V / 10 A** (eigenes!) |
| **5 V Servo** | 10× SG90 (je ~250 mA bewegt), 3× MG996R (**je 2.5 A Stall!**) | 5–7 A | **5 V / 5 A** je Servo-Station |
| **5 V Logik** | 10× ESP32, 5× DFPlayer + Lautsprecher | ≈ 2 A | alte Handyladegeräte |

**Drei Regeln**, die hier über Erfolg oder Frust entscheiden:
1. **LED-Strips und Servos nie am selben Netzteil.** Der Anlaufstrom eines
   MG996R lässt die Strips sichtbar zucken.
2. **Alle Massen verbinden.** Getrennte Netzteile, aber GND durchgehend – sonst
   erkennt der ESP32 die Signale nicht.
3. **Kein 5 V über Distanz** (siehe `02`): 12 V verteilen, vor Ort mit LM2596
   auf 5 V runter.

---

## Die Infrastruktur-Bestellung

| Artikel | Menge | ca. CHF | Zweck |
|---|---|---|---|
| **ESP32 DevKit V1** | 10 | 40 | 8 Stationen + 2 Reserve |
| **ESP32 Schraubklemmen-Breakout** | 10 | 25 | Bei 75 Sensoren ist Schrauben statt Löten die halbe Miete |
| **PCF8574 I/O-Expander** | 10 | 10 | 48 Kontakte auf 2 Pins |
| **IRF520 MOSFET-Modul** | 8 | 8 | Hubmagnet, Haftmagnet, LED-Dimmung |
| **74AHCT125 Pegelwandler** | 3 | 5 | 3.3 → 5 V für die WS2812B-Daten |
| **LM2596 Step-Down** | 10 | 8 | 12 V → 5 V vor Ort |
| **Netzteil 12 V / 10 A** | 1 | 15 | Hauptschiene |
| **Netzteil 5 V / 10 A** | 1 | 12 | Nur für die LED-Strips |
| **Netzteil 5 V / 5 A** | 1 | 8 | Nur für die Servos |
| **MicroSD 8 GB** | 5 | 20 | Für die DFPlayer – wird immer vergessen |
| **1N4007 Dioden** | 100 | 2 | Freilauf, siehe oben |
| **Elko 1000 µF / 16 V** | 10 | 3 | An jedem LED-Strip-Anfang |
| **Widerstandssortiment** (2.2 k, 330 Ω, 10 k) | 1 | 6 | Pull-ups und Datenleitungen |
| **Dupont-Kabel-Sets** | 3 | 5 | |
| **Alarmkabel 4-adrig, 100 m** | 1 | 25 | Sensoren zur Station |
| **Lüsterklemmen / WAGO** | – | 15 | |
| | | **≈ 207** | |

Das ist **weniger als die CHF 240** aus dem alten Katalog, obwohl deine Auswahl
grösser ist – weil GPIO-Expander, alte Handyladegeräte und billige Netzteile
die teuren Posten (Pi-HAT, Reise-Router, MeanWell) ersetzen.

**Gesamt: CHF 224 Teile + CHF 207 Infrastruktur ≈ CHF 430**, plus die drei
Ergänzungen unten.

---

## Was in deiner Auswahl fehlt

### 🔴 1. Der Not-Aus (CHF 15)

Du hast den **433-MHz-Handsender + Empfänger** nicht angehakt. Das war der eine
Posten, bei dem ich geschrieben habe, dass ich ihn unter keinen Umständen
streichen würde – und zwar nicht aus Bequemlichkeit:

In einem dunklen, vernebelten Keller mit Stroboskop, einer fallenden Puppe und
angeheiterten Gästen brauchst du **einen Knopf in der Hosentasche, der alles
stoppt und das Licht anmacht.** Jemand stürzt, jemandem wird schlecht, jemand
bekommt Panik – das passiert an einem Abend mit 40 Leuten mit realistischer
Wahrscheinlichkeit. 433 MHz, weil es als einziges zuverlässig durch Kellerwände
geht.

Der zweite Nutzen: **ein Mensch mit einem Knopf ist der beste Sensor der Welt.**
Ihr seht, wann die Gruppe bereit ist – kein Sensor trifft den Moment so gut.

→ 3× Handsender 4-Kanal + 2× RXB6-Empfänger, **CHF 15**.

### 🟡 2. Du kannst noch nichts mit 230 V schalten

Du hast keinen der 230-V-Posten gewählt. Für deine Nebelmaschine ist das
**wahrscheinlich in Ordnung** – mit einem deiner 2-Kanal-Relais schaltest du
parallel zum Taster der Kabelfernbedienung (der CHF-5-Weg aus der letzten
Antwort).

**Prüf das heute Abend:** Ist die Fernbedienung deiner Nebelmaschine
**abnehmbar**, also steckt sie in einer Buchse hinten am Gerät (3-polig XLR
oder DIN)? 
- **Ja** → perfekt, Relais parallel zum Taster, du brauchst nichts zusätzlich.
- **Nein**, der Knopf sitzt fest am Gehäuse → **SwitchBot Bot, CHF 20.90**,
  klebt drauf und drückt ihn, per Bluetooth direkt vom Pi steuerbar.

Und überleg kurz, ob ihr **irgendeine 230-V-Lampe** schalten wollt. Du hast
12-V-COB-Module und Strips gewählt, das deckt vermutlich alles ab – aber falls
eine bestehende Kellerlampe mitspielen soll, brauchst du einen myStrom
(CHF 39) oder eine Funksteckdose.

### 🟡 3. Nur ein Windenmotor (CHF 12)

Du hast **1× JGY-370** genommen. Das ist das Teil deiner Liste, das du am
wenigsten improvisieren kannst, wenn es am Aufbautag stirbt – alles andere hast
du mehrfach. Nimm einen zweiten mit, er kostet zwölf Franken.

---

## Zwei Anmerkungen, kein Handlungsbedarf

- **3× L298N für 1 Motor** ist grosszügig. Schadet nicht (sie können auch
  Vibrationsmotoren oder einen zweiten Antrieb treiben), aber du hättest 2
  sparen können.
- **5× RC522** ist viel Rätsel für einen Kellergang. Das ist eine
  Dramaturgie-Entscheidung, keine technische: fünf Stellen, an denen Gäste einen
  Gegenstand hinlegen müssen, bremsen den Durchlauf spürbar. Zwei als
  Höhepunkte wirken meist stärker. Technisch: RC522 ist SPI, also **max. ~30 cm
  Kabel** zum ESP32 – jeder Leser braucht seinen Controller in Griffweite.
- **Nicht gewählt, aber für CHF 10 der beste Effekt der Liste:** die
  4× 12-V-Lüfter. Ein kalter Luftstoss in den Nacken im Dunkeln, ohne sichtbare
  Quelle. Deine Entscheidung – ich erwähne es, weil das Preis-Wirkung-Verhältnis
  konkurrenzlos ist.
