# 07 – Bestellplan, Zoll und Timing

**Heute: 16.09.2026.** Falls die Party an Halloween ist: **Samstag, 31.10.2026 –
also noch 45 Tage.** Das ist komfortabel, aber nicht so komfortabel, dass man
AliExpress-Bestellungen noch zwei Wochen liegenlassen sollte.

---

## Die Doppelgleisig-Strategie

Dein Instinkt mit "Masse statt Klasse, AliExpress, ein kaputter Sensor ist okay"
ist für dieses Projekt genau richtig. Mit einer Ergänzung:

> **Alles, was das Grundgerüst trägt, kaufst du in der Schweiz.
> Alles, was Vielfalt bringt, kaufst du in China.**

Wenn das China-Paket zwei Wochen zu spät kommt, steht die Show trotzdem – sie ist
dann nur weniger bunt. Wenn du aber deine einzigen ESP32 aus China erwartest und
die stecken beim Zoll, hast du gar nichts.

| Gleis | Was | Wann bestellen | Lieferzeit |
|---|---|---|---|
| **A – Schweiz, Grundgerüst** | ESP32 (3–4), Netzteile, Relais, Pi-Zubehör, ein Satz Kernsensoren | bis **10.10.** | ✅ 1–3 Tage |
| **B – AliExpress, Masse** | Sensorkits, Motoren, Solenoide, Kleinteile, Pneumatik | **diese Woche** | ✅ 7–21 Tage, Puffer bis 30 |
| **C – Lokal/Galaxus, 230 V & Effekte** | Nebelmaschine, myStrom, UV, Stroboskop, Router | bis **20.10.** | ✅ 1–3 Tage |
| **D – Baumarkt** | Gaffa, WAGO, Kabelbinder, Holz, Seil, Verlängerungen | am Aufbau-Wochenende | sofort |

---

## Zoll Schweiz – das Wichtigste in vier Punkten

1. **Freigrenze ≈ CHF 62** (Warenwert inkl. Versand). Darunter fallen keine
   Einfuhrabgaben an, weil MwSt + Zoll unter der CHF-5-Bagatellgrenze bleiben.
2. **Darüber**: Verzollungsgebühr des Transporteurs **CHF 13–16 + ~3 %** des
   Warenwerts. Das kann eine CHF-70-Bestellung schnell auf CHF 90 treiben.
3. **Seit 2025** ziehen grosse Plattformen (AliExpress, eBay, Etsy) die Schweizer
   MwSt bereits **beim Checkout** ein. Es gibt aber dokumentierte Fälle, wo bei
   der Zustellung nochmal kassiert wurde – **Bestellbeleg aufbewahren**.
4. **Praktische Konsequenz: splitte deine AliExpress-Bestellungen in Pakete unter
   ~CHF 60.** Da AliExpress ohnehin pro Verkäufer separat versendet, passiert das
   oft von selbst – aber achte bewusst darauf, nicht CHF 200 bei einem einzigen
   Händler zu bestellen.

Quellen: [comparis.ch](https://www.comparis.ch/telecom/zuhause/online-shopping/aliexpress) ·
[preispirat.ch](https://www.preispirat.ch/aliexpress-schweiz/) ·
[Konsumentenschutz](https://www.konsumentenschutz.ch/online-ratgeber/verzollungskosten-online-shops/)

---

## Die Schweizer Shops im Vergleich

| Shop | Preisniveau | Versand | Lieferzeit | Stärke |
|---|---|---|---|---|
| [**ShopOfThings**](https://shopofthings.ch/) | günstig (teils exkl. MwSt angezeigt) | ✅ ab CHF 2 | ✅ 24–48 h | bestes Preis-Leistungs-Verhältnis in CH |
| [**Bastelgarage**](https://www.bastelgarage.ch/) | günstig–mittel | ≈ CHF 5–9 | 1–3 Tage | **grösste Auswahl**, Lager in CH |
| [**Pi-Shop.ch**](https://www.pi-shop.ch/) | mittel–hoch | ≈ CHF 7–9 | ✅ Versand gleichentags | offizieller Pi-Reseller, Adafruit/Pimoroni |
| [**Play-Zone**](https://www.play-zone.ch/) | eher hoch | ≈ CHF 7 | 1–3 Tage | Lager Steinhausen ZG |
| [**BerryBase.ch**](https://www.berrybase.ch/) | günstig (EUR-Preise) | ✅ CHF 9.50, gratis ab EUR 200 | ✅ 2–5 Tage (Kundenberichte teils 10) | riesiges Sortiment |
| [**Galaxus / Digitec**](https://www.galaxus.ch/) | mittel | oft gratis | 1–3 Tage | 230-V-Geräte, Nebelmaschinen, Smart Plugs |
| [**Distrelec / Conrad**](https://www.distrelec.ch/) | hoch | – | 1–3 Tage | wenn es schnell und sicher sein muss |

> Für dein Vorhaben: **ShopOfThings + Bastelgarage** für Elektronik,
> **Galaxus** für alles mit Netzstecker.

---

## Drei Budget-Stufen

### 🥉 Minimal – ca. CHF 350
Funktioniert, sieht gut aus, 4 Stationen.

| Posten | ca. |
|---|---|
| 2× 37-in-1 Sensorkit (AliExpress) | 30 |
| 6× ESP32 (AliExpress) | 30 |
| Pi-Netzteil + GPIO-HAT | 30 |
| 1× 8-Kanal-Relais + 2× 2-Kanal | 30 |
| 2× WS2812B-Rolle 30 LED/m (AliExpress) | 30 |
| Netzteile 5 V/10 A + 12 V/5 A | 50 |
| 3× DFPlayer + Lautsprecher + SD | 35 |
| 1× UV-Leiste + Neonfarbe | 40 |
| 433-MHz-Handsender + Empfänger | 15 |
| Funksteckdosen-Set 3er | 30 |
| Gaffa / WAGO / Kabel / Kleinteile | 30 |

### 🥈 Solide – ca. CHF 700 ⭐️ *meine Empfehlung*
Minimal + 6–7 Stationen, echte Mechanik, sicheres 230 V.

| Zusätzlich | ca. |
|---|---|
| Nebelmaschine + 5 l Fluid | 90 |
| 2× myStrom WiFi Switch (CH) | 78 |
| Winde: JGY-370 ×2 + L298N ×3 + Endschalter + Seil | 80 |
| 2× Elektro-Haftmagnet | 15 |
| 4× Solenoid + Dioden | 25 |
| 6× SG90 + 3× MG996R | 40 |
| 5× RCWL-0516 + 4× Lichtschranke | 40 |
| Stroboskop + 2. UV-Leiste | 60 |
| Reise-Router für Keller-WLAN | 35 |
| Trittmatten, Lüfter, Mist Maker | 70 |

### 🥇 Voll – ca. CHF 1'150
Solide + Pneumatik + Reserven + mehr Licht.

| Zusätzlich | ca. |
|---|---|
| Pneumatik-Set (Ventil, Zylinder, Schlauch) | 70 |
| 3× Shelly Plug S + CH-Adapter | 85 |
| 2 weitere WS2812B-Rollen 60 LED/m | 100 |
| Subwoofer / Aktivbox gebraucht | 80 |
| Reserve-ESP32, Reserve-Netzteile, 2. SD-Karte | 60 |
| 2× LD2410 mmWave | 30 |

---

## Bestellliste Gleis B (AliExpress) – jetzt bestellen

Aufgeteilt in Pakete unter der Zollgrenze:

| Paket | Inhalt | ca. USD |
|---|---|---|
| 1 | 2× 37-in-1 Sensorkit | 25 |
| 2 | 8× ESP32 DevKit, 2× ESP32-WROOM-32U + Antenne | 40 |
| 3 | JGY-370 ×2, L298N ×3, Solenoide ×4, Haftmagnete ×2 | 60 |
| 4 | SG90 ×10, MG996R ×3, 28BYJ-48 ×3, Vibrationsmotoren ×3 | 45 |
| 5 | Reed ×10, E18-D80NK ×5, TTP223 ×10, Mikroschalter ×20, Hall ×10 | 35 |
| 6 | Kleinteile: Widerstände, 1N4007, Elkos, LM2596, 74AHCT125, Dupont | 35 |
| 7 | Pneumatik: 4V210-08, SC32-100, Schlauch + Fittings | 45 |
| 8 | 433-MHz-Handsender ×3 + Empfänger ×2, Mist Maker ×2, Lüfter ×4 | 35 |

**≈ USD 320 ≈ CHF 285.** Bestelle die Pakete 1–5 **diese Woche**, den Rest bis
Ende September.

> **Tipp:** Bestelle von jedem *kritischen* Teil **eins mehr, als du brauchst**.
> Der Aufpreis ist bei diesen Preisen irrelevant, und ein defektes Modul am
> Aufbautag ohne Ersatz kostet dich einen ganzen Effekt.
