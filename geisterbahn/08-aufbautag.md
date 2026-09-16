# 08 – Vorbereitung und Aufbautag

## Vorher zu Hause erledigen (wichtigster Abschnitt des Dokuments)

Dein Plan ist, mit einer Kiste in den Keller zu gehen und dort mit deinem Freund
zu entscheiden, was wohin kommt. Das funktioniert **nur**, wenn vorher zu Hause
alles Technische schon fertig ist. Im Keller willst du Deko machen, nicht
debuggen.

### Checkliste "vor dem Keller"

- [ ] Pi fertig aufgesetzt: Mosquitto + Node-RED laufen, feste IP
- [ ] Reise-Router konfiguriert, eigene SSID `geisterbahn`, fester 2.4-GHz-Kanal
- [ ] **Alle ESP32 geflasht**, benannt (`tuer01`, `gang02`, …), feste IPs vergeben
- [ ] Jeder ESP32 **physisch beschriftet** (Gaffa + Edding) mit demselben Namen
- [ ] Jede Station als kleines Paket vorbereitet: ESP32 + Sensoren + Aktoren +
      Netzteil, zusammen in einem beschrifteten Gefrierbeutel
- [ ] Jeder Sensor **einzeln getestet** – auf dem Küchentisch, nicht im Keller
- [ ] MP3s auf die SD-Karten kopiert, Nummerierung notiert
- [ ] Node-RED-Grundgerüst steht: Armed-Flag, Not-Aus, Dashboard, eine
      Beispiel-Szene
- [ ] Backup: `flows.json` + alle YAMLs + SD-Karten-Image auf USB-Stick
- [ ] Winde einmal komplett aufgebaut und 50× durchlaufen lassen

### Die Kiste

| | |
|---|---|
| Werkzeug | Akkuschrauber, Seitenschneider, Abisolierzange, Lötkolben + Lot, Multimeter |
| Verbrauch | 3 Rollen schwarzes Gaffa, Kabelbinder, WAGO-Klemmen, Doppelklebeband, Heissleim |
| Strom | 4–5 Verlängerungskabel (10–20 m), 3 Steckdosenleisten, FI-Zwischenstecker |
| Ersatz | 2 ESP32, 1 Netzteil, 1 Relaismodul, Sicherungen |
| Diverses | Stirnlampe (!), Leiter, Massband, Edding, Etiketten, Klappstuhl |

---

## Der Ablauf im Keller

**1. Zuerst begehen, nichts aufbauen.** Geht den Weg zweimal ab, einmal mit
Licht, einmal im Dunkeln. Notiert:
- Wo sind Steckdosen? (das bestimmt, wo Stationen möglich sind)
- Wo sind die Engstellen, Ecken, Türen? (dort wirken Effekte am besten)
- Wo hängen **Rauchmelder**?
- Wo ist der Fluchtweg, und ist er frei?
- Wo geht das WLAN nicht hin? (Handy mit WLAN-Analyzer, 2 Minuten)

**2. Strom zuerst.** Verlängerungen legen und abkleben, *bevor* Deko steht.
Das ist die unbeliebteste halbe Stunde und die wichtigste.

**3. Router aufstellen, alle ESP32 einschalten, im Dashboard prüfen:
sind alle online?** Erst wenn alle 8 grün sind, geht es weiter.

**4. Stationen platzieren**, aber **noch nichts verdrahten**. Hinstellen,
zurücktreten, den Weg nochmal gehen. Dann verdrahten.

**5. Zusammenstecken.** Jetzt kommt der Teil, auf den du dich freust: Laptop auf
den Klappstuhl, Node-RED offen, und ihr klickt zusammen: *"Der Reed hier → die
Lampe dort, mit 400 ms Verzögerung."* Live, direkt testbar.

**6. Sperrzeiten einstellen.** Lauft den Weg als Gruppe zu zweit und guckt, was
mehrfach auslöst. Sperrzeiten hochdrehen, bis es sich richtig anfühlt.

**7. Der ehrliche Test.** Holt eine dritte Person, die nichts weiss, und schickt
sie durch. Ihr werdet in fünf Minuten mehr lernen als in zwei Stunden
Herumprobieren. Achtet darauf, *wohin sie schaut* – der halbe Effekt verpufft,
weil Leute nie dorthin gucken, wo man es erwartet.

---

## Dramaturgie – ein paar Regeln, die mehr bringen als jedes Bauteil

- **Weniger ist mehr.** Sechs gut getimte Effekte schlagen zwanzig, die
  durcheinander feuern.
- **Erst Spannung, dann Schreck.** Ein langer, dunkler, *ereignisloser* Gang mit
  nur einem leisen Geräusch – und dann erst die Puppe. Der leere Raum davor ist
  Teil des Effekts.
- **Der zweite Schreck kommt nach der Entwarnung.** Klassisch und wirkt immer:
  etwas passiert, alle lachen erleichtert, und *dann* passiert das Richtige.
- **Ton ist die Hälfte.** Ein Keller mit gutem Sounddesign und mittelmässiger
  Deko ist gruseliger als umgekehrt. Sag das deinem Freund, bevor er das ganze
  Budget in Puppen steckt.
- **Dunkel heisst nicht schwarz.** Absolute Dunkelheit ist nur unangenehm.
  Wenig, kaltes, falsch gerichtetes Licht ist gruselig.
- **Zufall einbauen** (siehe `06`), damit die zweite Gruppe nicht gewarnt wird.

---

## Während der Party

- Einer von euch beiden hat **immer den Handsender** und steht in der Nähe.
  Ein Mensch, der weiss, wann die Gruppe bereit ist, ist der beste Auslöser der
  ganzen Anlage.
- **Gruppen von 3–5 Leuten**, mit Abstand dazwischen. Zwanzig Leute auf einmal
  zerstören jeden Effekt und jede Sperrzeit.
- Alle 45 Minuten kurz durchgehen: Nebelfluid, verrutschte Sensoren, gelöste
  Kabel, ist die Winde noch in Position.
- Dashboard auf dem Handy offen lassen – dann seht ihr sofort, wenn ein Knoten
  offline geht.
