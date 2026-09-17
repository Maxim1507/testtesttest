# HANDOVER — Geisterbahn-Projekt

Übergabe an eine neue Session. Stand: 17.09.2026.

---

## 1 · Projekt

Maxim baut mit einem Freund eine **Geisterbahn im Keller** für eine Party
(vermutlich Halloween, Sa 31.10.2026). Der Freund macht die Optik und Deko,
Maxim die **komplette Technik**.

Aufbau: **Raspberry Pi 4** als Zentrale (Mosquitto + Node-RED), **8 ESP32-Knoten**
als Stationen, verbunden über **WLAN/MQTT**. Auf den ESP32 läuft **ESPHome**.
Sensoren lösen aus, Aktoren reagieren. Die Logik wird vor Ort in Node-RED
zusammengeklickt.

Wohnort **Schweiz** — alles muss in die Schweiz lieferbar sein. Budget knapp,
Motto «Masse statt Klasse»: ein defektes Billigteil ist akzeptiert.

## 2 · Wie Maxim arbeiten will

- **Antworte auf Deutsch.**
- Er ist **kein Elektronik-Profi**, aber technisch denkend und lernt schnell.
- Er will es **kompakt und prägnant**, keine Wall of Text, keine überflüssigen
  technischen Details. Wenn er ein Grundverständnis will, sagt er das.
- Er entscheidet gern selbst und **will nicht überredet werden**. Ein Einwand
  einmal sagen, dann seine Entscheidung akzeptieren und weitermachen.
- Preise bitte klar kennzeichnen: **bestätigt vs. geschätzt**.

## 3 · Stand der Arbeit

Repo `Maxim1507/testtesttest`, Branch
**`claude/geisterbahn-raspberry-automation-8itdih`**, Ordner `geisterbahn/`:

| Datei | Inhalt |
|---|---|
| `00-README.md` | Übersicht, Kurzfassung in 10 Zeilen |
| `01-architektur.md` | Pi + ESP32 + MQTT, warum nicht alles am Pi hängt |
| `02-verkabelung-limits.md` | Kabellängen pro Signalart, Spannungsabfall, Funk, 230-V-Sicherheit |
| `03-inputs.md` | Katalog aller 19 Auslöser-Typen |
| `04-outputs.md` | Katalog aller 21 Aktor-Typen + Infrastruktur |
| `05-mechanik-puppe.md` | Fallende Puppe: Haftmagnet + Seilwinde |
| `06-software.md` | ESPHome-YAML, MQTT-Topics, Node-RED-Patterns |
| `07-bestellplan.md` | Shops, Zoll, Timing |
| `08-aufbautag.md` | Checkliste, Dramaturgie |
| `09-einkaufsliste.md` | **überholt** |
| `10-infrastruktur-fuer-auswahl.md` | Pin-Bilanz, PCF8574, ADC2-Konflikt, Strombilanz |
| `11-einkaufsliste-final.md` | **Die gültige Einkaufsliste** — 9 AliExpress-Pakete, ≈ CHF 379 |

Auswahl-Checkliste als Artifact: https://claude.ai/artifact/97zLp3z4sZmkctJuRnfD83

## 4 · Getroffene Entscheidungen — bitte nicht neu aufrollen

| Entscheidung | Status |
|---|---|
| **433-MHz-Handsender / Not-Aus** | **Explizit abgelehnt.** Wurde zweimal empfohlen, er will es nicht. Nicht erneut vorschlagen. Not-Aus läuft übers Node-RED-Dashboard am Handy. |
| **JGY-370 Reservemotor** | Gestrichen. Stattdessen: Winde sofort nach Ankunft testen, dann bleibt Zeit für eine Nachbestellung. |
| **Netzteile** | Gekauft wird keins. Er nimmt ein **altes ATX-PC-Netzteil** (12 V + 5 V gleichzeitig, grün-auf-schwarz brücken zum Einschalten). |
| **MicroSD-Karten** | Hat er. |
| Schraubklemmen-Breakouts, 10× ESP32, 100 m Kabel | **Behält er** — Kürzungsvorschläge dort abgelehnt. |
| AliExpress statt Alibaba | Geklärt (Alibaba = B2B mit Mindestmengen). |

## 5 · Was Maxim schon besitzt

Raspberry Pi 4 · Nebelmaschine (400 W, Knopf drückt ca. 5 mm rein) ·
MicroSD-Karten · alte Handyladegeräte · vermutlich ein altes ATX-Netzteil.

**Offener Punkt:** Er sollte prüfen, ob die **Fernbedienung der Nebelmaschine
abnehmbar** ist (Buchse hinten am Gerät). Wenn ja → 2-Kanal-Relais parallel zum
Taster, kostet nichts. Wenn nein → SwitchBot Bot (CHF 20.90, per Bluetooth
direkt vom Pi steuerbar). Antwort steht noch aus.

## 6 · DER AKTUELLE AUFTRAG

Bisher konnte ich **keine Shop-Seite direkt öffnen** — der Egress-Proxy hat alle
Shop-Domains mit 403 abgewiesen. Alle Preise in den Dokumenten sind deshalb
**Schätzungen oder aus Such-Previews**.

Maxim stellt das Environment jetzt auf **Custom Network Access** mit diesen
Domains um:

```
*.aliexpress.com   *.alicdn.com      *.bastelgarage.ch
*.shopofthings.ch  *.galaxus.ch      *.digitec.ch
*.berrybase.ch     *.pi-shop.ch
```

**Deine Aufgabe:**

1. **Zuerst testen, was wirklich erreichbar ist:**
   ```
   for u in https://www.aliexpress.com https://www.bastelgarage.ch https://shopofthings.ch https://www.galaxus.ch; do
     printf "%-34s " "$u"; curl -sS -o /dev/null -w "%{http_code}\n" --max-time 15 "$u"
   done
   curl -sS "$HTTPS_PROXY/__agentproxy/status"
   ```
2. **Echte Preise und konkrete Produkte** für die Liste in `11-einkaufsliste-final.md`
   besorgen — pro Position ein verlinktes Angebot statt eines Suchlinks.
3. Datei aktualisieren, committen, pushen.

**Technischer Kontext:**
- Chromium + Playwright sind vorinstalliert (`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`).
  **Kein `playwright install` ausführen.** Für JS-lastige Seiten wie AliExpress
  ist ein echter Browser nötig, `curl` liefert dort nur die leere Hülle.
- **Erwartung:** Die Schweizer Shops sind servergerendert und funktionieren
  zuverlässig. AliExpress hat aggressiven Bot-Schutz — aus einem
  Rechenzentrums-IP landet man oft im Captcha. Das ist kein Fehler deinerseits.
- **Fallback, wenn AliExpress blockt:** sag es Maxim klar und bitte ihn um
  **Screenshots** der Trefferliste aus seinem Account. Er liest Screenshots gern,
  und nur dort sieht man die echten Versandkosten in die Schweiz. Die Schweizer
  Preise holst du parallel selbst.
- **Netzwerk niemals umgehen**, TLS-Prüfung nie deaktivieren, `HTTPS_PROXY` nie
  entfernen. Bei 403 vom Proxy: melden, nicht umrouten.

## 7 · Worauf bei welchem Teil achten

Das sind die Positionen mit echter Verwechslungsgefahr:

| Teil | Kriterium |
|---|---|
| **ESP32 DevKit** | **38-Pin**-Version, ESP32-WROOM-32. Nicht 30-Pin, nicht S2/C3/CAM. Muss aufs Breakout passen. |
| **Schraubklemmen-Breakout** | Ebenfalls 38-Pin, am besten beim selben Verkäufer wie die Boards. |
| **LDR-Modul** | **4 Pins** (VCC, GND, `D0`, `A0`) mit blauem Poti. 3-Pin-Versionen können nur analog — dann greift der ADC2/WLAN-Konflikt. |
| **UV-Strip** | **12 V**, 395–400 nm, 5050 SMD. Nicht 365 nm (teurer, für Haut/Augen heikler). |
| **WS2812B** | **5 V** und wirklich WS2812B. WS2811 ist etwas anderes (12 V, schaltet in 3er-Gruppen). IP30 lässt sich am leichtesten kürzen und löten. |
| **JGY-370** | Langsame Ausführung, **ca. 20–40 U/min** für die Seilwinde. |
| **Elektro-Haftmagnet** | «holding electromagnet», 12 V, 25 kg — **kein** Solenoid. |
| **Hubmagnet** | Push-**Pull**, Hub ≥ 10 mm. |
| **Relaismodule** | 5 V Spulenspannung **und** Optokoppler-Isolierung. |
| **PCF8574** | Modulversion mit Stiftleisten, nicht der nackte IC. |
| **E18-D80NK** | NPN, NO (Schliesser). |
| **MG996R, DFPlayer Mini** | Klone sind verbreitet. Bei diesem Preis egal — einfach eins mehr bestellen. |

**Allgemeine AliExpress-Regeln:** nach *Orders* sortieren (nicht nach Preis),
1000+ Bestellungen und 4.7+ Sterne, das billigste Angebot ist meist eine Falle,
die Varianten-Dropdowns («1pc/5pcs/10pcs», «5V/12V») sind wichtiger als der Titel,
Versand in die Schweiz prüfen.

## 8 · Falls das Custom Environment nicht reicht

Plan B ist **Claude Code lokal** auf Maxims Rechner — dort gibt es diesen Proxy
nicht. Dann kann er das Repo klonen und die Arbeit dort fortsetzen.
