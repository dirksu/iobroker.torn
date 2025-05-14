# ioBroker.torn

![Logo](https://www.torn.com/favicon.ico)

**Torn City API Adapter für ioBroker**  
Dieser Adapter verbindet deinen ioBroker mit der [Torn City API](https://www.torn.com/api.html), um Spielereignisse in deinem Smart Home sichtbar oder nutzbar zu machen.

---

## 🔧 Features

- Verbindung zur Torn API mit deinem persönlichen API-Key
- Anzeige von Basisdaten (Name, Status, Level)
- Abfrage von Events, Benachrichtigungen und Angriffen
- Möglichkeit zur Automatisierung (z. B. Lichtsteuerung bei Angriff)

---

## 🚀 Installation (Developer Mode)

```bash
git clone https://github.com/DEIN_GITHUB/iobroker.torn
cd iobroker.torn
npm install
iobroker add torn --host DEIN_HOSTNAME
```

> Hinweis: Alternativ mit `iobroker upload torn` aktualisieren.

---

## ⚙️ Konfiguration

In den Adapter-Einstellungen im ioBroker Admin trägst du deinen persönlichen [Torn API-Key](https://www.torn.com/preferences.php?tab=api) ein. Der Key muss für den Zugriff auf die gewünschten Daten freigeschaltet sein (mindestens `user:basic`, `user:events`, `user:attacks`).

---

## 📡 Beispiel-Anwendung: Angriffstrigger

Der Adapter kann regelmäßig prüfen, ob du angegriffen wurdest. Beispielhafte Anwendung:

- Wenn du im Spiel angegriffen wirst, wird ein Datenpunkt `torn.alerts.attack` auf `true` gesetzt.
- In ioBroker kannst du diesen Wert mit einem Skript oder Blockly verwenden:
  - Wohnzimmerlicht wird rot
  - Telegram-Nachricht wird gesendet
  - Sound-Alarm auf Alexa

> Derzeit in Entwicklung – melde dich für Ideen oder Erweiterungen!

---

## 🔜 Geplante Features

- Detaillierte Angriffs-Auswertung (`attacks`)
- Benachrichtigung via ioBroker States, Telegram oder Alexa
- Auswahl von Spielern zur Überwachung
- Fraktionsstatus & Kriegsmeldungen
- Einbindung ins VIS-Dashboard

---

## 🧙‍♂️ Entwickler

Dieser Adapter wird gepflegt von **Rumblestilzchen**  
Für Anregungen, Bugreports oder Mitstreiter → einfach melden!

---

## 📜 Lizenz

MIT License – freie Nutzung & Erweiterung.
