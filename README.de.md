# YouTube-Titelübersetzung - zweisprachige Titel mit KI

[![GitHub stars](https://img.shields.io/github/stars/GaryGaryyy/YouTube-AI-Title-Translator?style=for-the-badge)](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/GaryGaryyy/YouTube-AI-Title-Translator?style=for-the-badge)](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/network)
[![GitHub issues](https://img.shields.io/github/issues/GaryGaryyy/YouTube-AI-Title-Translator?style=for-the-badge)](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/issues)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green?style=for-the-badge&logo=google-chrome&logoColor=white)](https://chromewebstore.google.com/detail/bhajnflcikmidmdalnjhknillnkaojhk)

<p align="center">
  <a href="README.md">简体中文</a> |
  <a href="README.en.md">English</a> |
  <a href="README.ja.md">日本語</a> |
  <a href="README.ko.md">한국어</a> |
  <a href="README.th.md">ไทย</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md">Français</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.pt.md">Português</a> |
  <a href="README.id.md">Bahasa Indonesia</a> |
  <a href="README.vi.md">Tiếng Việt</a> |
  <a href="README.ru.md">Русский</a> |
  <a href="README.ar.md">العربية</a> |
  <a href="README.hi.md">हिन्दी</a>
</p>

Eine Chrome-Erweiterung, die YouTube-Videotitel mit KI übersetzt: Die Übersetzung erscheint direkt an der Position des Originals, das verkleinert darunter erhalten bleibt. Beim Stöbern erkennst du sofort, worum es in einem Video geht – und lernst nebenbei, wie echte Titel in anderen Sprachen formuliert werden. Kostenlos und Open Source; API Key und Einstellungen bleiben ausschließlich in deinem Browser.

## Aktuelle Änderungen (v8.0.3)

- **Funktioniert auch ohne API Key**: Ohne konfigurierten Key nutzt die Erweiterung automatisch die in Chrome 138+ integrierte On-Device-Übersetzung – Einstieg ganz ohne Kosten
- **Fehlgeschlagene Übersetzungen per Klick wiederholen**: Fehlgeschlagene Titel werden rot markiert; ein Klick startet die Übersetzung erneut
- **Fix für „Unerwartetes Antwortformat" durch den DeepSeek-V4-Thinking-Modus**: Bei der V4-Serie ist Thinking standardmäßig aktiv; die Denkkette verbrauchte das Ausgabekontingent und das JSON wurde abgeschnitten. Thinking ist für V4-Modelle jetzt deaktiviert
- Neu im Popup: Button zum Leeren des Übersetzungs-Cache (mit Anzahl der Einträge); Anbieterkarten mit gespeichertem Key zeigen einen grünen Punkt; beim Konfigurationstest wird direkt eine Beispielübersetzung angezeigt
- 12 neue Oberflächensprachen hinzugefügt – die Oberfläche unterstützt jetzt 14 Sprachen

## Kernfunktionen

| Funktion | Beschreibung |
|------|------|
| Übersetzung + Original im Vergleich | Die Übersetzung erscheint als Haupttitel, das Original bleibt darunter sichtbar – ideal zum schnellen Scannen und zum Sprachenlernen |
| KI-Kontextübersetzung | Kein Wort-für-Wort-Ersetzen: Memes, Tonfall, Abkürzungen und Clickbait-Formulierungen werden verstanden |
| Inhalts-Tags | Erzeugt automatisch Tags wie Tech, News, Musik und Finanzen – erst die Kategorie sehen, dann entscheiden, ob sich der Klick lohnt |
| Mehrsprachige Übersetzung | Erkennt gängige Quellsprachen automatisch und übersetzt in 12 Zielsprachen; Titel, die bereits in der Zielsprache vorliegen, werden automatisch übersprungen |
| Mehrere KI-Anbieter | DeepSeek, OpenAI, Gemini, Claude, MiniMax, Z.AI und Kimi sind integriert; eigene OpenAI-kompatible Endpunkte werden unterstützt |
| Integrierte Übersetzung ohne Key | Ohne Key wird der in Chrome integrierte Translator verwendet: läuft auf dem Gerät, kostet nichts, lädt keinen Text hoch |
| Lokaler Cache und Datenschutz | Übersetzungen werden lokal zwischengespeichert und vermeiden wiederholte Anfragen; API Key und Konfiguration bleiben nur in diesem Browser |

## Demo

| Englisch -> Japanisch | Englisch -> Koreanisch |
|---|---|
| ![English to Japanese](screenshots/v8.0.1/en-to-ja.png) | ![English to Korean](screenshots/v8.0.1/en-to-ko.png) |

| Englisch -> Thailändisch | Englisch -> Spanisch |
|---|---|
| ![English to Thai](screenshots/v8.0.1/en-to-th.png) | ![English to Spanish](screenshots/v8.0.1/en-to-es.png) |

| Chinesisch -> Englisch | Chinesisch -> Französisch |
|---|---|
| ![Chinese to English](screenshots/v8.0.1/zh-to-en.png) | ![Chinese to French](screenshots/v8.0.1/zh-to-fr.png) |

| Chinesisch -> Deutsch | Chinesisch -> Portugiesisch |
|---|---|
| ![Chinese to German](screenshots/v8.0.1/zh-to-de.png) | ![Chinese to Portuguese](screenshots/v8.0.1/zh-to-pt.png) |

| Chinesisch -> Indonesisch | Chinesisch -> Vietnamesisch |
|---|---|
| ![Chinese to Indonesian](screenshots/v8.0.1/zh-to-id.png) | ![Chinese to Vietnamese](screenshots/v8.0.1/zh-to-vi.png) |

## Schnellstart

### Methode 1: Chrome Web Store (empfohlen)

[Jetzt aus dem Chrome Web Store installieren](https://chromewebstore.google.com/detail/bhajnflcikmidmdalnjhknillnkaojhk)

### Methode 2: Installation im Entwicklermodus

1. Öffne [GitHub Releases](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/releases), lade die ZIP-Datei der neuesten Version herunter und entpacke sie.
2. Gib `chrome://extensions/` in die Chrome-Adressleiste ein und aktiviere oben rechts den „Entwicklermodus".
3. Klicke auf „Entpackte Erweiterung laden" und wähle den entpackten Ordner.

Klicke nach der Installation auf das Erweiterungssymbol in der Browser-Symbolleiste: Wähle zuerst die Zielsprache (`Translate titles into`, deutsch: `Titel übersetzen in`), dann einen KI-Anbieter und füge den API Key ein. Nach dem Speichern die YouTube-Seite aktualisieren – fertig. Es funktioniert auch ohne Key, siehe unten „Kein API Key? Integrierte Übersetzung verwenden".

## Konfiguration

![Konfigurationsoberfläche der Erweiterung](screenshots/v8.0.1/config-ui.png)

| Bereich | Funktion |
|------|------|
| `Sprache der Oberfläche` (Interface language) | Anzeigesprache der Konfigurationsoberfläche (14 Sprachen); ändert weder die YouTube-Seite noch das Übersetzungsziel |
| `Übersetzung` (Translation-Schalter) | Ob Titel auf YouTube-Seiten automatisch übersetzt werden; beim Pausieren werden bereits gerenderte Übersetzungen von der Seite entfernt |
| `Titel übersetzen in` (Translate titles into) | Zielsprache der Titelübersetzung, Standard: Englisch |
| `KI-Anbieter wählen` (Choose AI provider) | KI-Anbieter auswählen; Standard und Empfehlung: DeepSeek; Karten mit gespeichertem Key zeigen unten rechts einen grünen Punkt |
| `Modelleinstellungen` (Model settings) | Modellversion wählen oder über „Other model (enter manually)" eine Modell-ID von Hand eintragen |
| API Key | Der Key, den du beim jeweiligen Anbieter beantragt hast; wird nur lokal gespeichert |
| `Eigener Endpunkt` (Custom endpoint) | Bindet kompatible Dienste wie OpenRouter, SiliconFlow, Volcengine Ark, Ollama und LM Studio an |
| `Speichern` (Save settings) | Konfiguration speichern; danach empfiehlt es sich, die YouTube-Seite zu aktualisieren |
| `Test configuration` | Prüft, ob die aktuelle Konfiguration funktioniert; bei Erfolg wird direkt eine Beispielübersetzung angezeigt, bei Fehlschlag ein Hinweis nach Ursache (Key ungültig / Kontingent erschöpft / Modellname falsch / Netzwerkfehler) |
| `Clear translation cache` | Löscht den lokalen Übersetzungs-Cache (zeigt die aktuelle Anzahl der Einträge); der Cache ist nach Zielsprache getrennt, ein Sprachwechsel beeinflusst die anderen Sprachen nicht |

## Kein API Key? Integrierte Übersetzung verwenden

Ohne konfigurierten Key versucht die Erweiterung automatisch den in Chrome 138+ integrierten Translator / LanguageDetector: Die Übersetzung läuft auf deinem Gerät, es wird kein Text hochgeladen und es entstehen keine Kosten. Sprachpaare, die auf dem Gerät nicht unterstützt werden, zeigen den Hinweis „Erweiterung konfigurieren"; sobald der Key eines beliebigen KI-Anbieters hinterlegt ist, lassen sich alle unterstützten Sprachen übersetzen.

Die integrierte Übersetzung kann keine Inhalts-Tags vergeben; an der Tag-Position erscheint „Lokal / On-device".

## Anbieter, Modelle und API Keys

| Anbieter | Integrierte Modelle | Key beantragen |
|--------|----------|--------------|
| DeepSeek (empfohlen) | `deepseek-v4-flash`, `deepseek-v4-pro`, `deepseek-chat` | [platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys) |
| OpenAI | `gpt-5.5`, `gpt-5.4-mini`, `gpt-5.4` | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| Google Gemini | `gemini-3.5-flash`, `gemini-3-pro-preview`, `gemini-3-flash-preview`, `gemini-2.5-flash` | [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) |
| Claude | `claude-opus-4-7`, `claude-opus-4-6`, `claude-sonnet-4-6`, `claude-haiku-4-5` | [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) |
| MiniMax | `MiniMax-M2.7-highspeed`, `MiniMax-M2.7`, `MiniMax-M2.5` | [platform.minimax.io](https://platform.minimax.io/user-center/basic-information/interface-key) |
| Z.AI | `glm-5.1`, `glm-5.1-flash`, `glm-4.6` | [z.ai/manage-apikey/apikey-list](https://z.ai/manage-apikey/apikey-list) |
| Kimi | `kimi-k2.6`, `kimi-k2.6-turbo`, `kimi-k2.6-thinking` | [platform.kimi.ai/console/api-keys](https://platform.kimi.ai/console/api-keys) |

Die Erweiterung selbst ist kostenlos; die Anbieter berechnen die API-Nutzung nach ihren jeweiligen Plattformregeln.

### Eigener Endpunkt

Mit `Benutzerdefiniert` (Custom) lässt sich jeder Dienst anbinden, der das OpenAI-Chat-Completions-Format unterstützt. Auszufüllen sind:

- `API-Endpunkt` (API Endpoint): vollständige Anfrage-URL, zum Beispiel `https://openrouter.ai/api/v1/chat/completions`
- `Modellname` (Model name): die vom Anbieter geforderte Modell-ID, zum Beispiel `openai/gpt-5.4-mini`
- `API Key`: der Schlüssel des jeweiligen Anbieters

Beim ersten Speichern einer neuen Domain fragt Chrome eine Berechtigung ab – sie ist nötig, damit die Erweiterung den Anbieter direkt aufrufen kann. Eigene Endpunkte müssen HTTPS verwenden (Ausnahme: lokales Debugging über `localhost`).

## Unterstützte Sprachen

**Zielsprachen (12)**: 简体中文 / 繁體中文 / English / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt

**Oberflächensprachen (14)**: English / 简体中文 / 日本語 / 한국어 / ไทย / Español / Français / Deutsch / Português / Bahasa Indonesia / Tiếng Việt / Русский / العربية / हिन्दी

**Quellsprachen**: Keine Auswahl nötig – gängige Titelsprachen wie Englisch, Chinesisch, Japanisch, Koreanisch, Thailändisch, Spanisch, Französisch, Deutsch, Portugiesisch, Indonesisch, Vietnamesisch, Russisch, Arabisch und Hindi werden automatisch erkannt.

## Datenschutz und Daten

```text
API Key / Zielsprache / Oberflächensprache / Anbieter-Konfiguration -> lokaler Chrome-Speicher
Titeltext                                                           -> nur an den von dir gewählten KI-Anbieter
                                                                    -> nicht über den Server des Entwicklers
```

Die Erweiterung sammelt keinerlei Daten: Die Konfiguration wird im lokalen Speicher des aktuellen Browsers abgelegt, und Titeltexte gehen zur Übersetzung direkt an den von dir eingerichteten Anbieter. Bei der integrierten Übersetzung verlässt der Text das Gerät nicht.

## Für Entwickler

```bash
git clone https://github.com/GaryGaryyy/YouTube-AI-Title-Translator.git
cd YouTube-AI-Title-Translator
```

Aktiviere unter `chrome://extensions/` den Entwicklermodus und wähle über „Entpackte Erweiterung laden" den Projektordner. Nach Codeänderungen auf der Erweiterungskarte auf Neu laden klicken und anschließend die YouTube-Seite aktualisieren.

Tests ausführen (Node 18+, keine Drittanbieter-Abhängigkeiten):

```bash
npm test
```

Technologie-Stack: Manifest V3 (Content Script + Background Service Worker), natives HTML/CSS/JS, Chrome Storage Local API, kein Build-Schritt.

## Feedback und Support

- Fehler melden und Funktionen vorschlagen: [GitHub Issues](https://github.com/GaryGaryyy/YouTube-AI-Title-Translator/issues)
- E-Mail: garyzhang345@gmail.com

## Lizenz

Dieses Projekt ist unter der MIT License veröffentlicht, Details siehe [LICENSE](LICENSE).

*Zuletzt aktualisiert: 5. September 2026*
