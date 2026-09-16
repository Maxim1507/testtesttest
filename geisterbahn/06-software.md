# 06 – Software: das "Zusammenstecken"

> Du hast überlegt, ob Claude dir eine kleine UI bauen soll, in der man Auslöser
> und Aktionen zusammensteckt. **Diese UI gibt es schon und sie heisst Node-RED.**
> Genau das: Kästchen, die man mit Drähten verbindet, im Browser, per Drag&Drop,
> ohne eine Zeile Code. Sie ist ausgereift, läuft auf dem Pi und hat für alles,
> was du vorhast, fertige Bausteine. Etwas Eigenes zu bauen wäre in diesem Fall
> ein schlechteres Ergebnis bei zehnfachem Aufwand.

## Der Stack

| Ebene | Software | Warum |
|---|---|---|
| ESP32-Knoten | **ESPHome** | Konfiguration in YAML statt C++. **Over-the-Air-Update**: du änderst im Keller eine Zeile und flashst über WLAN. Kein USB-Kabel, kein Laptop-Gefummel hinter der Deko. |
| Transport | **MQTT (Mosquitto)** | Leichtgewichtig, lokal, ohne Internet, alle reden über Topics |
| Logik + UI | **Node-RED** | Der visuelle Editor. Plus Dashboard für ein Handy-Bedienpanel. |

Bewusst **ohne Home Assistant**: das wäre eine weitere grosse Komponente,
die du für einen Abend nicht brauchst. ESPHome funktioniert problemlos direkt
über MQTT, ohne HA.

---

## Installation auf dem Pi (ca. 30 Minuten)

```bash
# Raspberry Pi OS Lite (64-bit), dann:
sudo apt update && sudo apt upgrade -y

# MQTT-Broker
sudo apt install -y mosquitto mosquitto-clients
sudo systemctl enable --now mosquitto

# Für ein lokales Netz ohne Internetzugang reicht das hier:
echo -e "listener 1883\nallow_anonymous true" | sudo tee /etc/mosquitto/conf.d/local.conf
sudo systemctl restart mosquitto

# Node-RED (offizielles Skript, installiert auch Node.js)
bash <(curl -sL https://raw.githubusercontent.com/node-red/linux-installers/master/deb/update-nodejs-and-nodered)
sudo systemctl enable --now nodered

# Audio-Ausgabe für den Hauptsound
sudo apt install -y mpg123

# ESPHome (zum Flashen der Knoten) - besser auf dem Laptop als auf dem Pi
pip3 install esphome
```

Node-RED läuft danach unter `http://<pi-ip>:1880`,
das Dashboard unter `http://<pi-ip>:1880/ui`.

**Node-RED-Erweiterungen, die du willst** (Menü → Manage Palette):
- `node-red-dashboard` – Bedienpanel fürs Handy
- `node-red-contrib-play-audio` oder einfach der `exec`-Node mit `mpg123`

---

## ESPHome-Knoten: ein vollständiges Beispiel

Datei `keller-tuer01.yaml` – ein Knoten mit Türkontakt, Taster, Relais und
einem Solenoid:

```yaml
esphome:
  name: tuer01
  friendly_name: "Station Tür"

esp32:
  board: esp32dev

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  fast_connect: true        # nicht alle Kanäle scannen -> schneller Reconnect
  power_save_mode: none     # WICHTIG: sonst 200-500 ms Latenz
  manual_ip:                # feste IP = ein Fehlerfall weniger
    static_ip: 192.168.4.51
    gateway: 192.168.4.1
    subnet: 255.255.255.0

logger:
api:
ota:
  - platform: esphome

mqtt:
  broker: 192.168.4.10
  topic_prefix: geisterbahn/tuer01
  discovery: false

# ---------- EINGÄNGE ----------
binary_sensor:
  - platform: gpio
    name: "Reed Tuer"
    pin:
      number: GPIO13
      mode: { input: true, pullup: true }
      inverted: true          # Kontakt schliesst nach GND
    filters:
      - delayed_on: 20ms      # Entprellung
      - delayed_off: 200ms

  - platform: gpio
    name: "Taster Rot"
    pin:
      number: GPIO14
      mode: { input: true, pullup: true }
      inverted: true
    filters:
      - delayed_on: 30ms

# ---------- AUSGÄNGE ----------
switch:
  - platform: gpio
    name: "Relais Licht"
    pin: GPIO26
    id: relais_licht

  # Solenoid: NUR kurz anziehen, sonst wird er heiss
  - platform: gpio
    name: "Klopfer"
    pin: GPIO27
    id: klopfer
    on_turn_on:
      - delay: 250ms
      - switch.turn_off: klopfer

# ---------- LED-STRIP ----------
light:
  - platform: esp32_rmt_led_strip
    name: "Strip Gang"
    pin: GPIO25
    num_leds: 60
    rmt_symbols: 64
    chipset: WS2812
    rgb_order: GRB
    effects:
      - flicker:
          name: "Kaputte Neonroehre"
          alpha: 60%
          intensity: 60%
      - pulse:
          name: "Herzschlag"
          transition_length: 250ms
          update_interval: 900ms
```

Flashen: `esphome run keller-tuer01.yaml` (erstes Mal per USB, danach über WLAN).

Der Knoten meldet sich dann automatisch unter
`geisterbahn/tuer01/binary_sensor/reed_tuer/state` mit `ON`/`OFF` und hört auf
`geisterbahn/tuer01/switch/relais_licht/command`.

---

## Node-RED: der Flow, den ihr vor Ort zusammensteckt

### Die Grundkette

```
[mqtt in]          [switch]        [switch]         [trigger]        [link out]
 reed/state    →   == "ON"    →   armed == true  →  send, then   →   → Szene
                                                    block 20 s
```

Fünf Kästchen. Genau das, was du dir vorgestellt hast:
*"dieser Auslöser → diese Aktion"*.

### Die vier Bausteine, die den Unterschied machen

**1. Sperrzeit (Cooldown) – der wichtigste**
Der `trigger`-Node im Modus *"send message, then block further messages for 20
seconds"*. Ohne das feuert deine Puppe im Maschinengewehr-Takt, sobald eine
Gruppe von acht Leuten durch die Lichtschranke läuft. **Jede** Station braucht
das. Richtwert: 15–30 s.

**2. Scharf / Entschärft**
Ein globaler Flag in `flow context`. Solange ihr aufbaut, ist alles entschärft
und ihr könnt durch den Keller laufen ohne dass alles losgeht. Ein Schalter im
Dashboard, plus eine Taste auf dem Handsender.

**3. Szene = mehrere Aktionen mit Versatz**
Eine Szene ist ein `link in` → mehrere parallele `delay`-Nodes → `mqtt out`:

```
                ┌─ [delay 0 ms]    → Haftmagnet AUS      (Puppe fällt)
                ├─ [delay 120 ms]  → Sound "schrei.mp3"
 [link in] ─────┼─ [delay 150 ms]  → Stroboskop AN
  "puppe"       ├─ [delay 2 s]     → Stroboskop AUS
                ├─ [delay 4 s]     → Winde hoch
                └─ [delay 9 s]     → Haftmagnet AN
```

**Die 120 ms Versatz beim Sound sind kein Zufall.** Bewegung zuerst, Ton knapp
danach – das Gehirn verarbeitet es als eine Einheit, aber der Schreck ist
grösser, als wenn beides exakt gleichzeitig kommt.

**4. Not-Aus**
Ein `mqtt in` auf `geisterbahn/system/panic` → `change`-Node setzt armed=false →
schickt an *alle* Aktor-Topics "aus" und an alle Lampen "weiss, 100 %".

### Fortgeschritten: Zufall

Ein `random`-Node vor einem `switch`-Node: die Puppe fällt nur bei **jeder
dritten** Auslösung, dafür knarrt sonst nur eine Tür. Dann funktioniert der
Effekt auch beim vierten Durchgang noch, weil die Leute, die schon drin waren,
ihren Freunden nicht sagen können, was kommt. Das ist der billigste Weg zu einer
Bahn, die mehrfach begehbar bleibt.

---

## Das Dashboard (`/ui`) – euer Regiepult

Baut euch auf dem Handy:
- **Grosser roter NOT-AUS-Knopf**
- Schalter **Scharf / Entschärft**
- Ein Knopf pro Station: **manuell auslösen** (für den Fall, dass der Sensor
  nicht will, oder ihr den Moment besser trefft als jeder Sensor)
- Statusanzeige: welcher Knoten ist online (`mqtt in` auf die
  LWT-/`status`-Topics von ESPHome)
- **Reset-Knopf** für die Winde

Das ist realistisch eine Stunde Arbeit in Node-RED und rettet euch den Abend.

---

## Sichern!

Node-RED-Flows liegen in `~/.node-red/flows.json`. Das Ding **vor der Party
auf einen USB-Stick kopieren**, zusammen mit einem `dd`-Image der SD-Karte.
SD-Karten in Raspberry Pis sterben, und zwar bevorzugt am ungünstigsten Moment.

```bash
# Backup der Flows
cp ~/.node-red/flows.json /media/usb/flows-$(date +%F).json
# Alle ESPHome-YAMLs + secrets.yaml ebenfalls sichern
```

---

## Offen: soll ich noch etwas bauen?

Wenn du möchtest, kann ich zusätzlich liefern:

1. **Einen fertigen Node-RED-Flow als JSON** zum Importieren, mit Szenen,
   Cooldown, Armed-Logik, Not-Aus und Dashboard – dann musst du vor Ort nur noch
   Topics zuordnen statt alles neu zu bauen.
2. **Fertige ESPHome-YAML-Vorlagen** für 4–5 typische Stationstypen
   (Tür, Gang, Puppe, Sarg, Licht), sodass du nur Name und IP änderst.
3. **Eine eigene Mini-Web-UI**, falls dir Node-RED doch zu technisch ist: eine
   Seite mit zwei Spalten (links alle erkannten Sensoren, rechts alle Aktoren),
   wo man per Klick Verbindungen zieht und Verzögerung/Sperrzeit einstellt.
   Weniger mächtig als Node-RED, aber so einfach, dass auch dein Freund ohne
   Erklärung damit umgehen kann.

Sag einfach, was davon.
