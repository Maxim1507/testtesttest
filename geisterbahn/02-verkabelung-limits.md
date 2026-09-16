# 02 – Verkabelung, Kabellängen, Funk und Sicherheit

Das war deine Kernfrage. Kurzantwort: **Ja, Kabellänge ist ein echtes Problem,
aber nicht für alle Signalarten gleich – und man umgeht es, indem man Daten
funkt und nur Strom verkabelt.**

---

## 1. Raspberry Pi 4 – die harten Grenzen

| Eigenschaft | Wert | Konsequenz |
|---|---|---|
| Logikpegel | **3.3 V, NICHT 5 V-tolerant** | 5 V-Sensorausgang an GPIO = Pin tot. Pegelwandler oder Spannungsteiler nötig. |
| Nutzbare GPIOs | ~26 (BCM 2–27) | GPIO 0/1 (ID-EEPROM) freilassen |
| Strom pro Pin | max. **16 mA** | GPIO schaltet ein Relaismodul, **niemals** direkt einen Motor/LED-Strip |
| Strom gesamt 3.3 V-Schiene | max. **~50 mA** | 3 PIR-Sensoren an 3.3 V und die Schiene ist am Limit |
| 5 V-Pins | direkt vom Netzteil | belastbar, aber **kein** Motorstrom hier abzweigen |
| Analogeingänge | **keine** | LDR, Poti etc. brauchen ADC (MCP3008 ≈ CHF 4) – oder eben einen ESP32 |
| Netzteil | 5 V / 3 A USB-C | billige Netzteile → mysteriöse Abstürze. Nicht sparen. |

---

## 2. Welches Signal überlebt wie viel Kabel

Das ist die eigentliche Antwort auf "gibt es ein Problem, wenn die Kabel zu lang sind":

| Signalart | Realistisch max. | Was kaputt geht | Rettung |
|---|---|---|---|
| **Einfacher Schaltkontakt** (Reed, Taster, Endschalter) | **10–30 m** | Störeinstreuung, Fehlauslösungen | Externer Pull-up **1 k–4.7 kΩ** statt des internen (~50 kΩ), 100 nF nach GND am Controller, Software-Entprellung |
| **Digitaler Sensorausgang** (PIR, IR-Lichtschranke) | **5–15 m** | Spannungsabfall auf der *Versorgung*, nicht auf dem Signal | dickere Adern für V+/GND, oder 12 V hin und lokal auf 5 V regeln |
| **HC-SR04 Ultraschall** | **1–3 m** | µs-genaues Echo-Timing verschmiert → Mist-Messwerte | gehört an einen lokalen ESP32, Punkt |
| **I²C** (Displays, VL53L0X, ADS1115) | **~1 m** @ 100 kHz, mit Mühe 2–3 m | Bus-Kapazität, Flanken werden rund | auf 10 kHz runter, 1.8 kΩ Pull-ups, oder Bus-Extender P82B715. Besser: nicht machen. |
| **SPI** | **< 30 cm** | ganz schnell gar nichts | lokal halten |
| **1-Wire** (DS18B20) | **10–100 m** | – | dafür gebaut, funktioniert wirklich |
| **WS2812B / NeoPixel Daten** | **3–5 m** | Reflexionen, "letzte LEDs flackern bunt" | 330–470 Ω in Serie am Ausgang, **Pegelwandler 3.3→5 V (74AHCT125)**, 1000 µF am Strip-Anfang. Für lange Wege: Controller zum Strip bringen. |
| **Servo-PWM** | **2–3 m** | Zittern, Fehlpositionen | kurz halten, separates Netzteil |
| **RS485 / Modbus** | **bis 1200 m** | – | *die* Antwort, wenn du wirklich kabeln willst |
| **Ethernet** | 100 m | – | wenn eh Netzwerkdosen da sind |
| **WLAN** | Raumfrage, nicht Meterfrage | Beton | siehe unten |

### Der Trick mit dem Pull-up (für dein Tür-Beispiel)

Ein Reed-Kontakt an der Kellertür, 15 m vom Controller weg, ist die
zuverlässigste Sache der Welt – **wenn** du den internen Pull-up nicht benutzt:

```
  3.3 V ──[ 2.2 kΩ ]──┬──────── 15 m Kabel ────────┐
                      │                            │
                   GPIO-Pin                   Reed-Kontakt
                      │                            │
                   [100 nF]                        │
                      │                            │
  GND ────────────────┴──────── 15 m Kabel ────────┘
```

Der interne Pull-up des Pi/ESP ist mit ~50 kΩ so schwach, dass die Kapazität und
die eingestreuten Störungen eines 15-m-Kabels ihn locker überstimmen. Mit 2.2 kΩ
fliessen im geschlossenen Zustand 1.5 mA – das killt jede Einstreuung.
Plus 100 nF gegen GND als Tiefpass, plus im Code 20–50 ms Entprellzeit.
Das läuft dann bombenfest.

> **Wichtig:** Die beiden Adern sollen ein **verdrilltes Paar** sein (z.B. ein
> Paar aus einem CAT5-Kabel). Zwei einzeln verlegte Adern sind eine Antenne.

---

## 3. Das unterschätzte Problem: Strom, nicht Daten

Spannungsabfall auf der Leitung:

```
U_drop = (2 × Länge × Strom) / (56 × Querschnitt[mm²])
```

| Szenario | Abfall | Urteil |
|---|---|---|
| 5 V, 2 A, 20 m, Dupont-Kabel (0.08 mm²) | **17.9 V** | physikalisch tot |
| 5 V, 2 A, 20 m, 0.25 mm² | **5.7 V** | tot |
| 5 V, 2 A, 20 m, 1.5 mm² | 0.95 V | grenzwertig |
| 12 V, 2 A, 20 m, 1.5 mm² | 0.95 V | ✅ ok (8 % von 12 V) |

**Daraus folgen zwei Regeln:**

1. **5 V niemals über Distanz verteilen.** Wenn schon kabeln, dann 12 V und vor
   Ort mit einem Step-Down-Modul (≈ CHF 2) auf 5 V.
2. **Besser: gar nicht kabeln.** Eine 230 V-Verlängerung + Mehrfachstecker zu
   jeder Station und dort ein 5 V-Steckernetzteil. Das ist billiger, sicherer und
   flexibler als jede Niedervolt-Verteilung. Und du brauchst ohnehin 230 V an
   den meisten Stationen (Lampen, Nebelmaschine).

**Diese Jumper-/Dupont-Kabel** aus den Bastelsets sind ca. **AWG28 = 0.08 mm²**.
Die sind für Signale auf dem Steckbrett, nicht für Strom und nicht für Länge.

### WS2812B-Strips: Strom ist hier der Killer

Ein 5-m-Strip mit 60 LED/m = 300 LEDs. Volle Helligkeit weiss:
300 × 60 mA = **18 A**. Bei realistischem Geisterbahn-Einsatz (gedimmt, farbig)
eher 2–4 A – aber:

- Netzteil grosszügig wählen (5 V / 10 A für einen 5-m-Strip)
- **Power Injection**: 5 V/GND zusätzlich in der Mitte und am Ende einspeisen,
  sonst wird der Strip zum Ende hin bräunlich-rot
- Ein **1000 µF Elko** am Strip-Anfang gegen Einschaltspitzen
- Der Pi/ESP darf den Strip **niemals** über seinen 5 V-Pin versorgen

---

## 4. Funk: welche Option für was

| Technik | Reichweite Keller | Latenz | Kosten/Knoten | Wofür |
|---|---|---|---|---|
| **WLAN + MQTT** (ESP32) | gut im Raum, mässig durch Stahlbeton | 10–50 ms | ≈ CHF 6 | **Das Rückgrat.** Alle Stationen. |
| **ESP-NOW** (ESP32↔ESP32) | wie WLAN, aber ohne Router | 10–20 ms | ≈ CHF 6 | Kritische Direktverbindungen, Notfall-Fallback |
| **433 MHz** (RXB6/WL102) | **sehr gut durch Beton**, 30–100 m | ~50 ms | ≈ CHF 3 | Handsender, Panikknopf, Funksteckdosen. Einweg, keine Rückmeldung. |
| **nRF24L01+** | gut, 2.4 GHz | ~5 ms | ≈ CHF 2 | wenn WLAN partout nicht will; braucht SPI |
| **LoRa** | geht durch alles | 100 ms+ | ≈ CHF 10 | Overkill, aber falls eine Station im toten Winkel ist |

### WLAN im Keller – die drei Massnahmen

1. **Eigenen Access Point mitbringen.** Ein alter Router oder ein billiges
   Travel-Routerchen (≈ CHF 25) im Keller, eigene SSID nur für die Geisterbahn.
   Nicht auf das Haus-WLAN verlassen – da hängen am Partyabend 30 Handys drauf.
2. **2.4 GHz, fester Kanal (1, 6 oder 11).** ESP32 können **kein 5 GHz**.
   Automatischer Kanalwechsel des Routers = die Nodes verschwinden mitten in der Show.
3. **ESP32 mit externer Antenne** (Variante `WROOM-32U` + IPEX-Antenne, ≈ CHF 3
   Aufpreis) für die eine Station hinter der Betonwand.

In ESPHome ausserdem unbedingt:
```yaml
wifi:
  fast_connect: true      # kein Scan aller Kanäle beim Reconnect
  power_save_mode: none   # sonst bis zu mehrere 100 ms Latenz
```

---

## 5. 230 V – das nicht verhandelbare Kapitel

**Baue nichts selbst an 230 V.** Kein selbstverdrahtetes Relaismodul, das eine
Lampe schaltet. Nicht weil es nicht ginge, sondern weil ein Keller voller
angeheiterter Leute im Dunkeln genau der Ort ist, wo das schiefgeht. Und dein
8-Kanal-Relaismodul aus China hat zwischen Niedervolt- und Netzseite Kriechstrecken,
die keine Norm der Welt bestehen.

**Nimm fertige Geräte:**

| Lösung | Preis | Vorteil | Nachteil |
|---|---|---|---|
| **myStrom WiFi Switch (CH)** | ✅ CHF 39.– | **Schweizer Typ-13-Stecker**, lokale REST-API (`/relay?state=1`), kein Cloud-Zwang | teuer |
| **Shelly Plug S Gen3** | ✅ ca. CHF 15–23 (Galaxus) | MQTT nativ, perfekt für Node-RED | **Schuko** – braucht CH-Adapter |
| **Shelly Plus 1 / 1PM** (Einbaumodul) | ≈ CHF 15–20 | winzig, in ein Gehäuse einbaubar | Installation = Elektrikerarbeit |
| **433-MHz-Funksteckdosen-Set** | ≈ CHF 25–35 / 3 Stk | am billigsten, Pi sendet mit 433-Modul | Einweg, kein Statusfeedback, manchmal zickig |

Für eine Geisterbahn mit 4–6 geschalteten 230-V-Verbrauchern: **2× myStrom**
(für die zwei wichtigsten, weil bombensicher CH-kompatibel) + **1 Funksteckdosen-Set**
(für den Rest, wo ein verpasster Schaltbefehl egal ist).

### Weitere Sicherheitspunkte, die in keiner Bauanleitung stehen

- **FI/RCD prüfen.** Keller sind feucht. Wenn der Kellerstromkreis keinen
  FI-Schalter hat: nur über einen FI-Zwischenstecker (≈ CHF 30) arbeiten.
- **🔥 Nebelmaschine löst Rauchmelder aus.** Optische Rauchmelder reagieren auf
  Nebelfluid. Kläre *vorher*, ob im Keller/Treppenhaus welche hängen und ob die
  an eine Brandmeldeanlage gehen. Eine Feuerwehr an der Halloweenparty ist teuer.
  Alternative: **Ultraschall-Nebler / Mist Maker** (kalter Wassernebel, bodennah,
  löst normalerweise nichts aus).
- **Fluchtweg frei, und zwar wirklich.** Ein Kellergang mit Nebel, Stroboskop und
  Deko ist im Ernstfall nicht navigierbar. Ein Weg raus, beleuchtet, unverstellt.
- **Not-Aus.** Ein 433-MHz-Handsender, den du in der Tasche hast: ein Druck →
  alle Effekte aus, alle Lampen weiss an, Nebel aus. Das ist keine Paranoia,
  das brauchst du garantiert (jemand fällt hin, jemandem wird schlecht,
  jemand hat Panik).
- **Stroboskope**: Epilepsie-Warnung am Eingang. Kostet nichts.
- **Kabel abkleben.** Gaffa-Tape, grosszügig. Und eine Rolle Leuchtband für
  Stufenkanten.
- **Bewegte Teile dürfen niemanden treffen.** Die fallende Puppe braucht einen
  definierten Schwenkbereich mit Abstand zum Publikum, und ein Gewicht, das auch
  bei einem Volltreffer harmlos ist (Styropor-Kopf, kein Holz).
