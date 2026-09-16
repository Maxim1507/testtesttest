# 01 – Architektur

## Der Denkfehler, den man hier fast immer macht

Die naheliegende Idee ist: *Raspberry Pi in die Mitte, von dort 40 GPIO-Pins
sternförmig in den ganzen Keller.* Das geht schief, und zwar aus vier Gründen
gleichzeitig:

1. Der Pi 4 hat **3.3 V-Logik und ist nicht 5 V-tolerant**. Ein 5 V-Sensor, der
   direkt an einen GPIO geht, killt den Pin (oder den ganzen Pi).
2. Er hat praktisch **~26 nutzbare GPIOs** und **keinen einzigen Analogeingang**.
3. Lange Leitungen an hochohmigen GPIO-Eingängen fangen im Keller jeden Störimpuls
   ein (Leuchtstoffröhren, Waschmaschine, Heizungspumpe) → Geisterauslösungen.
   In einer Geisterbahn ist das ironisch, aber nicht lustig.
4. **Du kannst nichts mehr umstecken.** Wenn ihr vor Ort merkt "der Auslöser wäre
   3 m weiter besser", liegt das Kabel falsch.

## Die Architektur, die funktioniert

```
                  ┌─────────────────────────────┐
                  │   Raspberry Pi 4            │
                  │   • Mosquitto (MQTT-Broker) │
                  │   • Node-RED (Logik + UI)   │
                  │   • Audio-Ausgang → Anlage  │
                  │   • ggf. 433-MHz-Empfänger  │
                  └──────────────┬──────────────┘
                                 │ WLAN (2.4 GHz)
        ┌──────────────┬─────────┴────────┬──────────────┐
        │              │                  │              │
  ┌─────┴─────┐  ┌─────┴─────┐      ┌─────┴─────┐  ┌─────┴─────┐
  │ ESP32 #1  │  │ ESP32 #2  │      │ ESP32 #3  │  │ ESP32 #4  │
  │ "Tür"     │  │ "Gang"    │      │ "Puppe"   │  │ "Sarg"    │
  ├───────────┤  ├───────────┤      ├───────────┤  ├───────────┤
  │ Reed      │  │ Radar     │      │ Endsch.   │  │ Vibration │
  │ Taster    │  │ Lichtschr.│      │ ─────────  │  │ Touch     │
  │ ─────────  │  │ ─────────  │      │ H-Brücke  │  │ ─────────  │
  │ LED-Strip │  │ Relais    │      │ Solenoid  │  │ Servo     │
  │ Sound     │  │ Lüfter    │      │ Sound     │  │ UV-Licht  │
  └───────────┘  └───────────┘      └───────────┘  └───────────┘
   je: 230 V-Verlängerung + Steckernetzteil vor Ort
```

**Die Regel:** Kabel zwischen Sensor/Aktor und dem nächsten ESP32 bleiben
**unter 1 Meter**. Alles darüber geht per Funk oder gar nicht.

### Warum ESP32 und nicht alles am Pi

| | Pi-GPIO direkt | ESP32-Knoten |
|---|---|---|
| Kabellänge zum Sensor | kritisch ab ~5 m | immer < 1 m |
| Störempfindlichkeit | hoch | praktisch keine |
| Analogeingänge | 0 (ADC nötig) | 15 eingebaut |
| Umbauen vor Ort | Kabel neu ziehen | Knoten hinstellen, fertig |
| Kosten pro Station | "gratis" + Kabel | ≈ CHF 5–9 |
| Ausfall einer Station | evtl. hängt alles | nur diese Station |

Ein ESP32 für 6 Franken ist billiger als 20 m gescheites geschirmtes Kabel.
Das ist das ganze Argument.

### Wo der Pi trotzdem direkt was macht

Ein paar Dinge dürfen ruhig direkt an den Pi, wenn sie **in der Nähe der Regie**
sind:

- **Hauptsound.** Der Pi hat einen Klinkenausgang (bzw. besser: ein USB-Audio-
  Interface für ~CHF 10) → Aktivboxen. Der Soundtrack, die grossen Schreie und
  alles Musikalische läuft zentral. Pro-Sounds direkt bei der Puppe macht der
  lokale DFPlayer.
- **433-MHz-Empfänger** für die Handsender/Panikknöpfe (eine Antenne zentral
  reicht für den ganzen Keller – 433 MHz geht durch Beton, WLAN nicht so gut).
- **Ein 8-Kanal-Relaismodul** für alles, was im Regie-Raum steht.

### Fallback-Ebene: ESP-NOW

Falls das WLAN im Keller zickt (Beton, Stahlbeton, Heizungsraum): ESP32 können
untereinander **ESP-NOW** sprechen – direkt, ohne Router, ~10–20 ms Latenz und
deutlich robuster als WLAN+MQTT. Das ist kein ESPHome-Standardfeature, aber mit
~30 Zeilen Arduino-Code auf einem Knoten machbar.

Realistischer Plan: WLAN+MQTT als Rückgrat, und **für die eine, zeitkritischste
Aktion** (z.B. Lichtschranke → Puppe fällt) zusätzlich eine direkte
ESP-NOW-Verbindung oder gleich Sensor + Aktor am **selben** ESP32. Dann ist die
Reaktion auch dann noch da, wenn der Pi gerade neu startet.

> **Faustregel für die Latenz:** unter ~100 ms empfindet ein Mensch als "sofort".
> Lokaler MQTT über WLAN liegt typisch bei 10–50 ms. Das reicht locker – **wenn**
> du in ESPHome `power_save_mode: none` setzt. Sonst schläft der ESP32
> zwischendurch und du hast plötzlich 200–500 ms. Das ist der häufigste Grund,
> warum solche Projekte sich "träge" anfühlen.

## Namensschema (jetzt festlegen, spart am Aufbautag eine Stunde)

Jeder Knoten kriegt einen **Namen nach Ort, nicht nach Funktion** – weil sich die
Funktion vor Ort noch ändert, der Ort aber nicht:

```
geisterbahn/<ort>/<geraet>/state    ← Sensoren melden hierhin
geisterbahn/<ort>/<geraet>/set      → Aktoren hören hierauf
geisterbahn/system/armed            ← Scharf / entschärft
geisterbahn/system/panic            ← Not-Aus
geisterbahn/szene/<name>/trigger    ← Von Node-RED erzeugte "Szenen"
```

Beispiel: `geisterbahn/tuer01/reed/state`, `geisterbahn/gang02/relais1/set`.

**Beschrifte jeden ESP32 physisch mit demselben Namen** (Label oder Edding auf
Gaffa-Tape). Im dunklen Keller mit fünf identischen Platinen ist das Gold wert.
