# Geisterbahn im Keller – Technikkonzept & Bestellliste

**Stand:** 16.09.2026 · **Zentrale:** Raspberry Pi 4 · **Lieferziel:** Schweiz

| Dokument | Inhalt |
|---|---|
| `01-architektur.md` | Wie das Ganze aufgebaut wird, und warum |
| `02-verkabelung-limits.md` | Kabellängen, Strom, Funk, Sicherheit |
| `03-inputs.md` | Katalog aller Auslöser mit Preis & Link |
| `04-outputs.md` | Katalog aller Aktoren mit Preis & Link |
| `05-mechanik-puppe.md` | "Puppe fällt und wird hochgezogen" im Detail |
| `06-software.md` | MQTT + Node-RED + ESPHome, das "Zusammenstecken" |
| `07-bestellplan.md` | Warenkörbe, Zoll, Timing |
| `08-aufbautag.md` | Checkliste für den Tag im Keller |

---

## ⚠️ Zu den Preisen – bitte lesen

Ich konnte die Shop-Seiten **nicht direkt öffnen**: die Egress-Policy dieser Session
blockiert alle externen Shop-Domains (bastelgarage.ch, pi-shop.ch, aliexpress.com,
digitec.ch, berrybase.de … alle 403). Ich habe deshalb, wie von dir vorgeschlagen,
über Such-Previews gearbeitet.

Jede Preisangabe ist entsprechend markiert:

| Symbol | Bedeutung |
|---|---|
| ✅ | Preis stand so in der Such-Preview (Stand 16.09.2026) |
| ≈ | **Schätzung** von mir – Link ist da, bitte 10 Sekunden selbst nachschauen |

Bastelgarage zeigt in Previews teils **Netto**-Preise (exkl. 8.1 % MwSt),
ShopOfThings teils exkl. MwSt. Rechne bei Schweizer Shops im Kopf +8 % drauf,
dann liegst du richtig.

---

## Die Kurzfassung in 10 Zeilen

1. Der **Pi 4 ist die Regie, nicht die Verkabelung.** Er läuft an einem Ort mit Strom
   und WLAN und führt nur Logik aus.
2. Jede Station im Keller bekommt einen eigenen **ESP32** (≈ CHF 5–9). Der ESP32 hat
   die Sensoren und Aktoren *lokal* an sich dran – Kabel bleiben unter 1 m.
3. ESP32 ↔ Pi reden über **WLAN / MQTT**. Damit ist deine Kabelfrage vom Tisch:
   du verlegst **keine Datenkabel**, nur Strom.
4. Strom: **230 V-Verlängerung zu jeder Station + lokales Steckernetzteil.**
   5 V über 20 m Kabel funktioniert nicht (siehe `02`).
5. 230 V wird **nie selbst gebastelt** → Shelly / myStrom / Funksteckdose.
6. Auf dem Pi läuft **Mosquitto + Node-RED**. Node-RED *ist* genau die
   "Zusammenstecken"-UI, die du dir vorgestellt hast – Kästchen mit Drähten,
   im Browser, ohne Code.
7. Auf den ESP32 läuft **ESPHome**: Konfiguration in YAML, Flashen **over-the-air**.
   Du kannst also im Keller einen Sensor umhängen und den Node in 20 s umkonfigurieren,
   ohne USB-Kabel.
8. Das macht genau dein Szenario möglich: du kommst mit einer Kiste voller Teile an,
   ihr entscheidet vor Ort "der Auslöser hier → diese Lampe dort", und ihr klickt das
   im Browser zusammen.
9. **Kaufe Masse statt Klasse, aber doppelgleisig:** Basis (ESP32, Netzteile, Relais)
   in der Schweiz, damit die Show garantiert steht. Die Spielereien auf AliExpress.
10. **Wichtigstes Einzelteil das niemand einplant:** ein **Not-Aus / Panik-Knopf**
    (433 MHz Handsender) der alles stoppt und das Licht anmacht. Siehe `02`.
