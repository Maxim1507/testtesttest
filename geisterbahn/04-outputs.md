# 04 – Output-Katalog (Aktoren)

Legende: ✅ = Preis aus Such-Preview bestätigt (16.09.2026) · ≈ = Schätzung

---

## A. Schalten

### 1. Relaismodul 8-Kanal (optokoppler-isoliert) ⭐️ Arbeitstier
Schaltet alles, was 12 V braucht: Lampen, Motoren, Solenoide, Lüfter,
Nebler. Ein GPIO pro Kanal.

> **Nur für Niedervolt (≤ 30 V) verwenden.** Für 230 V → Punkt 2/3.
> Die Module *können* 230 V, aber die Isolationsabstände auf billigen Platinen
> sind für eine Party mit Laienpublikum nicht vertretbar.

Achtung: Die meisten Module sind **active-LOW** (GPIO auf 0 = Relais zieht an).
Und beim Booten des Pi/ESP flackern alle Ausgänge einmal durch – beim Einschalten
klackert also erst mal alles. Deshalb: Relaismodul **nach** dem Controller mit
Strom versorgen, oder Aktoren erst nach dem Boot freigeben.

| Quelle | Preis | Lieferzeit | Link |
|---|---|---|---|
| ShopOfThings 1/2/4/8-Kanal | ✅ CHF 4.64–18.57 (exkl.) | 24–48 h | [shopofthings.ch](https://shopofthings.ch/shop/prototyping/aktoren/2-4-channel-relay-220v-3-3v/) |
| Bastelgarage 8-Kanal | ≈ CHF 12–18 | 1–3 Tage | [bastelgarage.ch](https://www.bastelgarage.ch/8-kanal-relais-modul) |
| Bastelgarage 4-Kanal | ≈ CHF 8–12 | 1–3 Tage | [bastelgarage.ch](https://www.bastelgarage.ch/4-kanal-relais-modul) |
| Bastelgarage Pi-Relais-HAT 8-Kanal | ≈ CHF 25–35 | 1–3 Tage | [bastelgarage.ch](https://www.bastelgarage.ch/raspberry-pi-8-kanal-relais-modul-expansion-board) |
| AliExpress 8-Kanal 5 V | ≈ USD 4–7 | 10–25 Tage | [Suche](https://de.aliexpress.com/w/wholesale-8-channel-relay-module-5v.html) |

**Menge: 2× 8-Kanal + 3× 2-Kanal** (die kleinen für die verteilten ESP32-Knoten)

---

### 2. myStrom WiFi Switch (CH) – 230 V sicher ⭐️
**Schweizer Typ-13-Stecker**, kein Adapter nötig, lokale REST-API
(`http://<ip>/relay?state=1`) – Node-RED spricht das mit einem einzigen
HTTP-Request an. Kein Cloud-Zwang, funktioniert auch bei totem Internet.

| Quelle | Preis | Lieferzeit | Link |
|---|---|---|---|
| myStrom direkt | ✅ CHF 39.– | 2–5 Tage | [mystrom.ch](https://mystrom.ch/de/produkt/mystrom-wifi-switch/) |
| Galaxus / Digitec | ≈ CHF 33–39 | 1–3 Tage | [galaxus.ch Suche](https://www.galaxus.ch/de/search?q=mystrom%20wifi%20switch) |

**Menge: 2** (für Nebelmaschine und die wichtigste Lampe)

---

### 3. Shelly Plug S Gen3 – 230 V günstiger
Spricht **MQTT nativ**, also direkt in deinem Node-RED-Flow ohne Umweg.
**Aber: Schuko-Stecker** – du brauchst pro Stück einen CH-Adapter (≈ CHF 5).

| Quelle | Preis | Lieferzeit | Link |
|---|---|---|---|
| Galaxus (schwarz) | ✅ CHF 22.70 | 1–3 Tage | [galaxus.ch](https://www.galaxus.ch/de/s4/product/shelly-plug-s-gen3-smart-plug-49472472) |
| Galaxus (weiss) | ✅ CHF 22.– | 1–3 Tage | [galaxus.ch](https://www.galaxus.ch/de/s4/product/shelly-plug-s-mtr-gen3-white-smart-plug-49472463) |
| Digitec | ≈ CHF 20–25 | 1–3 Tage | [digitec.ch](https://www.digitec.ch/de/s1/product/shelly-plug-s-mtr-gen3-white-smart-plug-49472463) |

**Menge: 2–3** (+ CH-Adapter nicht vergessen!)

---

### 4. 433-MHz-Funksteckdosen-Set – 230 V am billigsten
Drei Steckdosen + Fernbedienung. Der Pi sendet mit einem 433-MHz-Sendermodul
(≈ CHF 2) die gleichen Codes. Einweg, keine Rückmeldung – wenn ein Befehl
verlorengeht, merkt es niemand. Für unkritische Sachen (Deko-Beleuchtung) top.

| Quelle | Preis | Lieferzeit | Link |
|---|---|---|---|
| Galaxus/Digitec Funksteckdosen-Set 3er | ≈ CHF 25–40 | 1–3 Tage | [galaxus.ch Suche](https://www.galaxus.ch/de/search?q=funksteckdosen%20set) |
| AliExpress | ≈ USD 12–20 | 10–25 Tage | [Suche](https://de.aliexpress.com/w/wholesale-433mhz-remote-control-socket.html) |

**Menge: 1 Set** · ⚠️ auf **Typ-13-Stecker (CH)** achten, nicht Schuko!

---

## B. Licht

### 5. WS2812B LED-Strip (adressierbar) ⭐️⭐️ Grösster Effekt pro Franken
Jede LED einzeln in jeder Farbe ansteuerbar. Damit machst du: Flackern wie eine
kaputte Neonröhre, langsames Rot-Pulsieren, einen Blitz der den Gang entlangläuft,
oder sanftes Grün das plötzlich in Blutrot kippt.

Beachte aus `02`: Pegelwandler 3.3→5 V, 330 Ω in Serie, 1000 µF Elko,
eigenes Netzteil, Datenleitung kurz.

| Quelle | Preis | Lieferzeit | Link |
|---|---|---|---|
| Bastelgarage 5 m / 30 LED/m | ≈ CHF 25–35 | 1–3 Tage | [bastelgarage.ch](https://www.bastelgarage.ch/5m-ws2812b-30led-m-led-neopixel-strip-rolle) |
| Bastelgarage 5 m / 60 LED/m | ≈ CHF 40–60 | 1–3 Tage | [bastelgarage.ch](https://www.bastelgarage.ch/5m-ws2812b-60led-m-led-neopixel-strip-rolle) |
| Bastelgarage LED-Neon-Schlauch 2 m | ≈ CHF 25–35 | 1–3 Tage | [bastelgarage.ch](https://www.bastelgarage.ch/2m-ws2812b-led-schlauch-50led-m-5v-rgb-neon-ip67) |
| AliExpress 5 m 30 LED/m | ≈ USD 8–15 | 10–25 Tage | [Suche](https://de.aliexpress.com/w/wholesale-WS2812B-5m-30leds.html) |

**Menge: 2–3 Rollen** (30 LED/m reicht völlig – für Atmosphäre willst du eh
gedimmt fahren, und es braucht halb so viel Strom)

---

### 6. UV- / Schwarzlicht ⭐️ Bestes Preis-Wirkung-Verhältnis der ganzen Liste
Eine UV-Röhre oder UV-LED-Leiste plus fluoreszierende Farbe (dein Freund kann
damit Wände, Spinnweben, Zähne, Augen bemalen) – das verwandelt einen
gewöhnlichen Keller sofort. Kostet fast nichts und wirkt enorm.

| Quelle | Preis | Lieferzeit | Link |
|---|---|---|---|
| Galaxus/Digitec UV-LED-Leiste / Schwarzlichtröhre | ≈ CHF 15–35 | 1–3 Tage | [galaxus.ch Suche](https://www.galaxus.ch/de/search?q=schwarzlicht%20uv%20led) |
| AliExpress UV-LED-Strip 5 m 395 nm | ≈ USD 6–12 | 10–25 Tage | [Suche](https://de.aliexpress.com/w/wholesale-UV-led-strip-395nm.html) |
| Neonfarbe / UV-Bodypaint | ≈ CHF 10–20 | – | Bastelladen / Coop Bau+Hobby |

**Menge: 2 Leisten** + Farbe (das ist Ressort deines Freundes)

---

### 7. Stroboskop / Blitzlicht
Sehr starker Effekt, sehr schnell zu viel. **Sparsam einsetzen**, max. 2–3 s pro
Auslösung, und ⚠️ **Epilepsie-Hinweis am Eingang**.

| Quelle | Preis | Lieferzeit | Link |
|---|---|---|---|
| Galaxus/Digitec LED-Stroboskop | ≈ CHF 20–45 | 1–3 Tage | [galaxus.ch Suche](https://www.galaxus.ch/de/search?q=stroboskop) |
| AliExpress 12 V COB-Blitz | ≈ USD 5–12 | 10–25 Tage | [Suche](https://de.aliexpress.com/w/wholesale-12v-strobe-light.html) |

**Menge: 1–2**

---

### 8. 12-V-LED-Spots / COB-Module
Simples An/Aus über Relais. Für gezielte Ausleuchtung einer Puppe, oder um eine
Ecke schlagartig sichtbar zu machen die vorher dunkel war.

| Quelle | Preis | Lieferzeit | Link |
|---|---|---|---|
| Bastelgarage / Galaxus 12 V LED-Spot | ≈ CHF 5–15 | 1–3 Tage | [bastelgarage.ch LED](https://www.bastelgarage.ch/led) |
| AliExpress 10er COB 12 V | ≈ USD 5–10 | 10–25 Tage | [Suche](https://de.aliexpress.com/w/wholesale-12v-cob-led-module.html) |

**Menge: 6–8**

---

## C. Bewegung

### 9. Servo SG90 (9 g) und MG996R (Metall, 10 kg·cm)
Dreht auf einen Winkel. SG90 für Leichtes (Kopf dreht sich, Kiefer klappt,
Augen bewegen sich, Türchen), MG996R für Schwereres (Arm hebt sich, Tür geht auf).

⚠️ Servos **nie** vom Pi/ESP-Board versorgen – Einschaltstrom reisst die Spannung
runter und der Controller startet neu. Eigenes 5–6 V-Netzteil, **gemeinsame Masse**.

| Quelle | Preis | Lieferzeit | Link |
|---|---|---|---|
| Bastelgarage MG996R | ≈ CHF 8–14 | 1–3 Tage | [bastelgarage.ch](https://www.bastelgarage.ch/high-torque-servo-mg996r-10kg-cm) |
| Bastelgarage SG90 | ≈ CHF 3–6 | 1–3 Tage | [bastelgarage.ch Motoren](https://www.bastelgarage.ch/stepper-motoren) |
| AliExpress SG90 10er-Pack | ≈ USD 10–16 | 10–25 Tage | [Suche](https://de.aliexpress.com/w/wholesale-SG90-servo-10pcs.html) |
| AliExpress MG996R | ≈ USD 3–5/Stk | 10–25 Tage | [Suche](https://de.aliexpress.com/w/wholesale-MG996R.html) |

**Menge: 6× SG90, 3× MG996R**

---

### 10. Schrittmotor 28BYJ-48 + ULN2003-Treiber
Sehr langsame, gleichmässige, **präzise** Drehung – gut für ein Portrait das sich
langsam zum Betrachter dreht, oder eine Tür die sich Millimeter für Millimeter
öffnet. Spottbillig, aber schwach.

| Quelle | Preis | Lieferzeit | Link |
|---|---|---|---|
| Bastelgarage 28BYJ-48 | ≈ CHF 4–8 | 1–3 Tage | [bastelgarage.ch](https://www.bastelgarage.ch/stepper-motor-schrittmotor-5v-1-64-28byj-48) |
| AliExpress 5er-Set mit Treiber | ≈ USD 6–10 | 10–25 Tage | [Suche](https://de.aliexpress.com/w/wholesale-28BYJ-48-ULN2003.html) |

**Menge: 3**

---

### 11. Schneckengetriebemotor JGY-370 (12 V) ⭐️ Der Winden-Motor
**Selbsthemmend** – das ist der entscheidende Punkt: er hält seine Position auch
stromlos, die Puppe sackt also nicht langsam ab. 20–150 U/min, viel Drehmoment.
Details siehe `05-mechanik-puppe.md`.

| Quelle | Preis | Lieferzeit | Link |
|---|---|---|---|
| Eckstein-Shop (DE) 12 V 90 rpm | ✅ EUR 13.95 | 5–12 Tage | [eckstein-shop.de](https://eckstein-shop.de/XYT-12V-DC-Motor-Gleichstrom-Getriebemotor-JGY-370-Schneckengetriebemotor-90rpm-EN) |
| eBay.ch Getriebemotoren | ✅ CHF 22–39 | 3–14 Tage | [ebay.ch](https://www.ebay.ch/b/12V-Motor-mit-Getriebe/181730/bn_7005280944) |
| AliExpress JGY-370 12 V | ≈ USD 8–15 | 10–25 Tage | [Suche](https://de.aliexpress.com/w/wholesale-JGY-370-worm-gear-motor.html) |

**Menge: 2** (einer als Reserve – das ist das Teil, das du am wenigsten
improvisieren kannst)

---

### 12. H-Brücke / Motortreiber
Damit dreht der Motor in beide Richtungen (Seil raus / Seil rein).
- **L298N**: klassisch, günstig, verheizt ~2 V – für JGY-370 völlig ok
- **BTS7960**: 43 A, für Scheibenwischermotoren
- **DRV8871**: effizienter, kleiner

| Quelle | Preis | Lieferzeit | Link |
|---|---|---|---|
| Bastelgarage L298N | ≈ CHF 5–9 | 1–3 Tage | [bastelgarage.ch](https://www.bastelgarage.ch/stepper-motoren) |
| AliExpress L298N | ≈ USD 1.50–3 | 10–25 Tage | [Suche](https://de.aliexpress.com/w/wholesale-L298N.html) |

**Menge: 3**

---

### 13. Hubmagnet / Solenoid 12 V (Push-Pull) ⭐️
Zieht/stösst einen Stift ~10–30 mm, sehr schnell und mit einem satten "KLACK".
Einsatz: an eine Tür klopfen, einen Deckel aufstossen, einen Riegel lösen,
etwas rütteln.

⚠️ **Einschaltdauer beachten**: Die billigen sind für Dauerbetrieb nicht gemacht
und werden heiss. In der Software: nur 200–400 ms anziehen, dann abschalten.
Und **Freilaufdiode** (1N4007) parallel zur Spule, sonst stirbt der Treiber.

| Quelle | Preis | Lieferzeit | Link |
|---|---|---|---|
| Digitec Push-Pull-Solenoid | ≈ CHF 15–25 | 1–3 Tage | [digitec.ch](https://www.digitec.ch/de/s1/product/oem-large-push-pull-solenoid-hubmagnet-24v-elektronikzubehoer-gehaeuse-5999600) |
| eBay.ch Hubmagnet 12 V | ✅ ab CHF 5.48 | 5–14 Tage | [ebay.ch](https://www.ebay.ch/sch/i.html?_nkw=hubmagnet) |
| AliExpress 12 V Push-Pull | ≈ USD 2–6 | 10–25 Tage | [aliexpress](https://de.aliexpress.com/item/1005001867843345.html) |

**Menge: 4**

---

### 14. Elektro-Haftmagnet 12 V (25–50 kg) ⭐️ Für den freien Fall
Hält ein Stahlplättchen fest, solange Strom fliesst. **Strom weg = Objekt fällt
sofort im freien Fall.** Das ist viel erschreckender als ein Motor, der langsam
abseilt – und es ist der Trick, mit dem professionelle Haunted Houses arbeiten.
Anschliessend zieht die Winde die Puppe gemütlich wieder hoch.

Bonus: bei Stromausfall fällt alles runter statt hängenzubleiben – das ist die
sichere Richtung.

| Quelle | Preis | Lieferzeit | Link |
|---|---|---|---|
| AliExpress Elektromagnet 12 V 25 kg | ≈ USD 3–8 | 10–25 Tage | [Suche](https://de.aliexpress.com/w/wholesale-12v-electromagnet-holding-25kg.html) |
| Galaxus/Distrelec Haftmagnet | ≈ CHF 20–40 | 1–5 Tage | [galaxus.ch Suche](https://www.galaxus.ch/de/search?q=elektromagnet%2012v) |

**Menge: 2**

---

### 15. Vibrationsmotor / Unwuchtmotor
Lässt einen Stuhl, einen Sarg, eine Vitrine oder ein Bett zittern. Mini-Version
(Handy-Vibration) für Kleinkram, 12-V-Unwuchtmotor für Möbel.

| Quelle | Preis | Lieferzeit | Link |
|---|---|---|---|
| AliExpress 12 V Vibrationsmotor | ≈ USD 2–6 | 10–25 Tage | [Suche](https://de.aliexpress.com/w/wholesale-12v-vibration-motor.html) |
| Bastelgarage Mini-Vibrationsmotor | ≈ CHF 2–5 | 1–3 Tage | [bastelgarage.ch](https://www.bastelgarage.ch/stepper-motoren) |

**Menge: 3**

---

### 16. 🏆 Upgrade: Pneumatik (Magnetventil + Zylinder)
Das ist, womit echte Geisterbahnen arbeiten. Ein 12-V-**5/2-Magnetventil** plus
ein **Pneumatikzylinder** plus ein Kompressor (hast du vielleicht schon, oder
leihweise) gibt dir eine Bewegung, die **explosiv schnell, sehr kräftig und
laut** ist. Eine Puppe, die pneumatisch 40 cm nach vorne schnellt, ist etwas
komplett anderes als ein Servo.

Der Kompressor muss weit weg stehen (er ist laut) – Pneumatikschlauch kannst du
problemlos 20 m verlegen, der stört sich nicht an Elektrosmog.

| Teil | Preis | Link |
|---|---|---|
| 5/2-Magnetventil 12 V (4V210-08) | ≈ USD 8–15 | [AliExpress](https://de.aliexpress.com/w/wholesale-4V210-08-12V-solenoid-valve.html) |
| Pneumatikzylinder SC32-100 | ≈ USD 10–20 | [AliExpress](https://de.aliexpress.com/w/wholesale-SC32-100-pneumatic-cylinder.html) |
| Schlauch 8 mm + Fittings | ≈ USD 10–15 | [AliExpress](https://de.aliexpress.com/w/wholesale-8mm-pneumatic-tube-fittings.html) |

**Menge: 1 Set** – als *der* Höhepunkt der Bahn. Wenn das Budget reicht:
absolut machen.

---

## D. Ton

### 17. DFPlayer Mini + Lautsprecher ⭐️ Lokaler Sound
MicroSD-Karte rein, MP3s drauf, über 2 Drähte vom ESP32 ansteuern. **Der
entscheidende Vorteil gegenüber zentralem Sound: der Ton kommt aus der Puppe.**
Ein Flüstern direkt neben dem Ohr wirkt zehnmal so stark wie derselbe Sound aus
der Anlage am Gangende.

| Quelle | Preis | Lieferzeit | Link |
|---|---|---|---|
| ShopOfThings DFPlayer Mini | ✅ CHF 5.00 (inkl.) | 24–48 h | [shopofthings.ch](https://shopofthings.ch/shop/aktoren/audio/mp3-player-modul-mit-sd-karte/) |
| Bastelgarage DFPlayer Mini | ≈ CHF 6–9 | 1–3 Tage | [bastelgarage.ch](https://www.bastelgarage.ch/dfplayer-mini-mp3-player-modul-fur-arduino) |
| Bastelgarage 3 W 8 Ω Lautsprecher | ≈ CHF 3–6 | 1–3 Tage | [bastelgarage.ch](https://www.bastelgarage.ch/3w-8ohm-lautsprecher-in-gehause) |
| AliExpress DFPlayer 5er | ≈ USD 6–10 | 10–25 Tage | [Suche](https://de.aliexpress.com/w/wholesale-DFPlayer-mini.html) |

**Menge: 5 Player + 5 Lautsprecher** (+ 5× MicroSD 2 GB, ≈ CHF 4/Stk)

---

### 18. Zentraler Sound vom Pi
Der Pi spielt über Klinke oder ein USB-Audio-Interface (≈ CHF 10) den
Grundteppich (Wind, Herzschlag, entferntes Stöhnen) und die grossen Schreie auf
eine Aktivbox / alte Stereoanlage. In Node-RED mit `exec` + `mpg123`
oder dem Node `node-red-contrib-play-audio`.

Bass macht hier den Unterschied: ein tiefes Brummen unter der Hörschwelle
(~30–40 Hz) erzeugt körperliches Unbehagen. Ein alter Subwoofer im Gang = Gold.

---

## E. Atmosphäre

### 19. Nebelmaschine 400 W
| Quelle | Preis | Lieferzeit | Link |
|---|---|---|---|
| Galaxus "Lighting Fixtures 400 W mit FB" | ≈ CHF 50–80 | 1–3 Tage | [galaxus.ch](https://www.galaxus.ch/de/s1/product/lighting-fixtures-nebelmaschine-400w-mit-fernbedienung-nebelmaschine-23178823) |
| Digitec Topliste "unter CHF 75" | ✅ < CHF 75 | 1–3 Tage | [digitec.ch](https://www.digitec.ch/de/s1/producttype/toplist/affordable/nebelmaschine-2255) |
| Galaxus BoomToneDJ F400 | ≈ CHF 60–90 | 1–3 Tage | [galaxus.ch](https://www.galaxus.ch/de/s1/product/boomtonedj-f400-nebelmaschine-24513107) |

**Schalten:** über myStrom/Shelly. ⚠️ Die meisten Maschinen heizen 3–5 Minuten
vor und brauchen zwischen den Stössen Aufheizpausen – du kannst sie nicht
beliebig oft triggern. Plane sie als **Grundnebel**, nicht als Schreckeffekt.
⚠️ **Rauchmelder!** (siehe `02`)

**Menge: 1** + 5 l Nebelfluid (≈ CHF 20)

---

### 20. Ultraschall-Nebler / Mist Maker
Kalter, bodennaher Wassernebel aus einer Schale. Löst normalerweise **keine
Rauchmelder** aus. Für einen brodelnden Kessel, ein Grab, eine Hexenküche.
Sieht mit einem LED-Spot von unten fantastisch aus.

| Quelle | Preis | Lieferzeit | Link |
|---|---|---|---|
| AliExpress Mist Maker 12/24 V | ≈ USD 5–15 | 10–25 Tage | [Suche](https://de.aliexpress.com/w/wholesale-ultrasonic-mist-maker.html) |
| Galaxus Nebler / Zimmerbrunnen-Nebler | ≈ CHF 15–30 | 1–3 Tage | [galaxus.ch Suche](https://www.galaxus.ch/de/search?q=ultraschall%20nebler) |

**Menge: 2**

---

### 21. 12-V-Lüfter / Gebläse 🌬️ Unterschätzt
Ein kurzer kalter Luftstoss in den Nacken, im Dunkeln, ohne sichtbare Quelle.
Kostet 4 Franken und ist einer der besten Effekte überhaupt, weil niemand ihn
kommen sieht und er nicht zuzuordnen ist.

| Quelle | Preis | Lieferzeit | Link |
|---|---|---|---|
| Bastelgarage 12 V Lüfter 80/120 mm | ≈ CHF 5–12 | 1–3 Tage | [bastelgarage.ch](https://www.bastelgarage.ch/bauteile) |
| AliExpress 12 V Lüfter | ≈ USD 2–5 | 10–25 Tage | [Suche](https://de.aliexpress.com/w/wholesale-12v-80mm-fan.html) |

**Menge: 3–4**

---

## F. Infrastruktur (nicht vergessen!)

| Teil | Menge | Preis | Lieferzeit | Link |
|---|---|---|---|---|
| **ESP32 DevKit** (billig, AliExpress) | 8 | ≈ USD 3–5/Stk | 10–25 Tage | [Suche](https://de.aliexpress.com/w/wholesale-ESP32-devkit-v1.html) |
| **ESP32** (CH, als Sicherheit) | 3 | ✅ CHF 22.90 (WaveShare, Galaxus) / ≈ CHF 9–15 Bastelgarage | 1–3 Tage | [bastelgarage.ch/esp32](https://www.bastelgarage.ch/esp8266-esp32/esp-boards) |
| ESP32-WROOM-**32U** + externe Antenne | 2 | ≈ USD 4–7 | 10–25 Tage | [Suche](https://de.aliexpress.com/w/wholesale-ESP32-WROOM-32U-antenna.html) |
| **Netzteil 5 V / 10 A** (für LED-Strips) | 1–2 | ✅ ≈ EUR 25.90 / ≈ CHF 25–35 | 1–10 Tage | [berrybase.ch](https://www.berrybase.ch/meanwell-1-kanal-einbau-schaltnetzteil-50w-5v/10a) · [galaxus.ch](https://www.galaxus.ch/de/s4/product/meanwell-schaltnetzteil-60w-5v-10a-spannungswandler-52638434) |
| **Netzteil 12 V / 5 A** (Motoren, Solenoide) | 2 | ≈ CHF 12–20 | 1–3 Tage | [galaxus.ch Suche](https://www.galaxus.ch/de/search?q=netzteil%2012v%205a) |
| **5 V USB-Steckernetzteile** (pro ESP32-Station) | 8 | ≈ CHF 3–6 | 1–3 Tage | Migros/Coop/Galaxus |
| **Step-Down DC-DC LM2596** (12→5 V) | 10 | ≈ USD 4–8 /10er | 10–25 Tage | [Suche](https://de.aliexpress.com/w/wholesale-LM2596-buck-converter.html) |
| **Pegelwandler 74AHCT125** (für WS2812) | 4 | ≈ USD 3–6 | 10–25 Tage | [Suche](https://de.aliexpress.com/w/wholesale-74AHCT125.html) |
| **Pi GPIO-Schraubklemmen-HAT** | 1 | ≈ CHF 12–20 | 1–5 Tage | [bastelgarage.ch](https://www.bastelgarage.ch/gpio-expansion-board-plus-fur-raspberry-pi) · [berrybase.de](https://www.berrybase.de/en/gpio-breakout-hat-with-spring-terminals-for-raspberry-pi) |
| **Pi 4 Netzteil 5 V/3 A USB-C** (original!) | 1 | ≈ CHF 12–18 | 1–3 Tage | [pi-shop.ch](https://www.pi-shop.ch/zubehoer) |
| **CAT5/CAT6-Kabelrolle** (verdrillte Paare für Schalter) | 50 m | ≈ CHF 20–30 | 1–3 Tage | Galaxus / Jumbo |
| **Widerstände 2.2 kΩ / 330 Ω / 10 kΩ** Sortiment | 1 | ≈ USD 5–10 | 10–25 Tage | [Suche](https://de.aliexpress.com/w/wholesale-resistor-kit-assortment.html) |
| **Dioden 1N4007** (Freilauf für Solenoide!) | 50 | ≈ USD 2 | 10–25 Tage | [Suche](https://de.aliexpress.com/w/wholesale-1N4007.html) |
| **Elkos 1000 µF / 16 V** | 10 | ≈ USD 3 | 10–25 Tage | [Suche](https://de.aliexpress.com/w/wholesale-1000uf-16v-capacitor.html) |
| **Dupont-Kabel-Sortiment** | 3 Sets | ≈ USD 3–5 | 10–25 Tage | [Suche](https://de.aliexpress.com/w/wholesale-dupont-jumper-wires.html) |
| **Schraub-Klemmen (WAGO 221)** | 30 | ≈ CHF 25–35 | 1–3 Tage | Jumbo/Bauhaus – **spart am Aufbautag Stunden** |
| **Reise-Router / AP für Keller-WLAN** | 1 | ≈ CHF 25–45 | 1–3 Tage | [galaxus.ch Suche](https://www.galaxus.ch/de/search?q=travel%20router) |
| **Gaffa-Tape, schwarz** | 3 Rollen | ≈ CHF 25 | – | Bauhaus |
| **Kabelbinder, Sortiment** | 1 | ≈ CHF 10 | – | Bauhaus |
