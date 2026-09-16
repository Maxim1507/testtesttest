# 05 – "Puppe fällt nach vorne und wird wieder hochgezogen"

Du hast das als Beispiel genannt, deshalb hier ausführlich – es ist die
mechanisch anspruchsvollste Sache in deiner Liste, und es gibt einen naheliegenden
Weg, der schlecht funktioniert, und einen etwas anderen, der sehr gut funktioniert.

---

## Der naheliegende Weg (und warum er enttäuscht)

*Motor lässt Seil ab → Puppe sinkt → Motor zieht wieder ein.*

Das Problem: **der Fall ist zu langsam.** Ein Getriebemotor lässt das Seil mit
vielleicht 20 cm/s ab. Die Puppe "sinkt" also gemächlich nach vorne. Das sieht
aus wie ein Aufzug, nicht wie ein Schreck. Der ganze Effekt lebt davon, dass die
Bewegung **schneller ist, als das Auge erwartet**.

---

## Der Weg, der funktioniert: Halten + Loslassen + Aufwickeln

Trenne die zwei Funktionen:

```
            ┌── Elektro-Haftmagnet (12 V, 25 kg)
            │   hält das Stahlplättchen an der Puppe
            │   → Strom weg = FREIER FALL
            │
   Decke ───┤
            │
            └── Winde: Schneckengetriebemotor JGY-370
                wickelt das Seil auf und zieht die Puppe
                langsam wieder in Position
```

**Ablauf:**

| t | Aktion |
|---|---|
| 0 ms | Trigger (Lichtschranke) |
| 0 ms | Haftmagnet stromlos → **Puppe fällt frei** |
| +120 ms | Sound (Schrei) + Stroboskop – *bewusst leicht verzögert*, damit die Bewegung zuerst kommt |
| +2 s | Effekte aus |
| +4 s | Windenmotor läuft rückwärts, zieht die Puppe hoch |
| +~8 s | Oberer Endschalter erreicht → Motor stoppt |
| +8.2 s | Haftmagnet wieder bestromt → Puppe hängt fest |
| +9 s | Winde gibt 2 cm Seil frei (Seil entlasten, Magnet trägt) |
| +30 s | Sperrzeit abgelaufen, Station wieder scharf |

Der freie Fall dauert bei 1.5 m Fallhöhe ca. **0.55 s** – das ist genau die
Geschwindigkeit, die erschreckt.

---

## Aufbau der Winde

| Teil | Warum genau das |
|---|---|
| **JGY-370 Schneckengetriebemotor 12 V, ~40–90 U/min** | **Selbsthemmend.** Ohne Strom hält er die Last. Ein normaler Getriebemotor lässt die Puppe langsam absacken. |
| **H-Brücke L298N** | Für beide Drehrichtungen |
| **Seiltrommel** | Ein Stück Rundholz / eine leere Klebebandrolle auf der Motorwelle. Ø 40 mm → ca. 12 cm Seil pro Umdrehung |
| **2× Endschalter** (oben / unten) | ⚠️ **Nicht optional.** Ohne sie wickelt der Motor weiter, bis das Seil reisst oder der Motor blockiert |
| **Drachenschnur / Angelsehne 20–50 kg** | dünn, reissfest, unsichtbar |
| **Umlenkrolle** | Kleiner Möbelrollen-Bock oder eine Seilrolle aus dem Baumarkt |

### Drei Sicherungsebenen in der Software (alle drei einbauen)

1. **Endschalter** – primäre Abschaltung
2. **Zeit-Timeout** – "wenn der Motor länger als 12 s läuft, ohne dass ein
   Endschalter kommt: abschalten und Fehler melden". Das rettet dich, wenn ein
   Endschalter sich löst (passiert garantiert).
3. **Strombegrenzung** über das Netzteil – ein 12 V/3 A-Netzteil kann den Motor
   nicht zerstören, auch wenn er blockiert.

---

## Sicherheit

- **Fallbereich abgrenzen.** Die Puppe muss ihren Bogen frei durchlaufen können,
  mit deutlichem Abstand zu dort stehenden Menschen. Markiere den Bereich am
  Boden (Gaffa) und stelle sicher, dass niemand dort warten kann.
- **Leicht bauen.** Styropor-/Schaumstoffkopf, Kleidung, Drahtgestell. Wenn es
  doch jemanden trifft, darf nichts passieren. **Kein Holzkopf, kein Metall.**
- **Aufhängung überdimensionieren.** Das Ding fällt einige hundert Mal an einem
  Abend. Was die 50. Auslösung übersteht, muss auch die 300. überstehen.
- **Vor der Party 50× durchlaufen lassen** und dann alle Knoten, Schrauben und
  Kabelverbindungen nochmal anziehen.
- **Not-Aus muss auch die Winde stoppen** – nicht nur Licht und Ton.

---

## Einfachere Varianten, falls die Zeit knapp wird

| Variante | Aufwand | Wirkung |
|---|---|---|
| **Servo-Klappe**: MG996R löst einen Riegel, Puppe kippt an einem Scharnier nach vorne, Rückstellung von Hand | ⭐ | ⭐⭐⭐ (fast so gut!) |
| **Pneumatikzylinder** stösst die Puppe nach vorne und zieht sie sofort zurück | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ (das Maximum) |
| **Vorhang fällt**: Haftmagnet hält eine Stange, die einen schwarzen Vorhang hochhält. Magnet aus → Vorhang fällt → dahinter steht beleuchtet etwas Schreckliches | ⭐ | ⭐⭐⭐⭐ |

Die **Vorhang-Variante** ist mein Preis-Leistungs-Tipp: ein Haftmagnet, ein
schwarzer Stoff, ein LED-Spot. Kostet 20 Franken, ist in 30 Minuten gebaut, kann
nicht kaputtgehen, kann niemanden verletzen – und "die Wand verschwindet und da
steht jemand" ist erschreckender als jede fallende Puppe.
