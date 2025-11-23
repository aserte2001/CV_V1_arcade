================================================================================
ARCADE LEBENSLAUF - 80ER JAHRE SPIELEHALLE
================================================================================

Ein interaktiver, voll funktionsfähiger Lebenslauf im Stil einer 80er-Jahre-
Spielhalle mit Neon-Farben, Sound-Effekten, Animationen und Minispielen. 
Erlebe deinen Lebenslauf als Arcade-Erlebnis!


FEATURES
================================================================================

Design & Stil
--------------------------------------------------------------------------------
- Neon-Design: Intensive Neon-Farben (#FF00FF, #00FFFF, #FFFF00, #FF00AA, #00FF99)
- Tron-Style Hintergrund: Animierte Pixel-Gitterlinien und flackernde 
  Neon-Schriftzüge
- Arcade-Automaten: Jeder Lebenslauf-Abschnitt ist ein eigener Arcade-Automat
- Retro-Ästhetik: Authentisches 80er-Jahre Arcade-Feeling

Minispiele
--------------------------------------------------------------------------------
- Pong: Für Jobs/Projekte
- Space Invaders: Für Herausforderungen
- Reaction Game: Boss-Fight
- Power-Up Game: Jump'n'Run für Skills

Sound & Interaktion
--------------------------------------------------------------------------------
- 8-Bit Arcade-Sounds: Coin, Laser, Game Over, etc.
- Sound-Manager: Ein-/Ausschalten möglich
- Interaktive Features:
  * Münze einwerfen → Minispiel startet
  * Joystick-Navigation
  * Highscore-Tabelle
  * Münzstapel (Jahre Berufserfahrung)

Spezielle Features
--------------------------------------------------------------------------------
- Easter Egg: Drücke C-O-N-T-R-O-L für Secret Level
- Confetti-Explosion: Bei Meilensteinen
- Game Over Screen: Download-Button als "Insert Coin to Continue"
- Responsive Design: Mobile und Desktop optimiert


SCHNELLSTART
================================================================================

Voraussetzungen
--------------------------------------------------------------------------------
- Node.js (Version 16 oder höher)
- npm (wird mit Node.js installiert)
- Git (optional, für Versionskontrolle)

Installation
--------------------------------------------------------------------------------
1. Repository klonen oder herunterladen
   
   git clone https://github.com/aserte2001/CV_V1_arcade.git
   cd CV_V1_arcade

2. Dependencies installieren
   
   npm install

   Hinweis für Windows PowerShell:
   Falls du einen Fehler bezüglich der Execution Policy erhältst:
   
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
   npm install

3. Entwicklungsserver starten
   
   npm run dev

4. Im Browser öffnen
   - Öffne http://localhost:5173 in deinem Browser
   - Die App läuft jetzt im Entwicklungsmodus


VERWENDUNG
================================================================================

Entwicklung
--------------------------------------------------------------------------------
npm run dev

Startet den Vite-Entwicklungsserver mit Hot Module Replacement (HMR). 
Änderungen werden automatisch im Browser aktualisiert.

Build für Produktion
--------------------------------------------------------------------------------
npm run build

Erstellt einen optimierten Produktions-Build im dist/ Ordner.

Preview des Builds
--------------------------------------------------------------------------------
npm run preview

Zeigt eine Vorschau des Produktions-Builds.


STEUERUNG
================================================================================

Desktop
--------------------------------------------------------------------------------
- Joystick: Navigation durch Lebenslauf-Abschnitte
- Maus: Klick auf Münzschlitz → Minispiel startet
- Tastatur: Pfeiltasten für Navigation
- Easter Egg: Tippe C-O-N-T-R-O-L für Secret Level

Mobile
--------------------------------------------------------------------------------
- Touch-Joystick: Navigation durch Lebenslauf-Abschnitte
- Touch: Klick auf Münzschlitz → Minispiel startet


TECHNOLOGIE-STACK
================================================================================
- React 18.2.0 - UI-Bibliothek
- Vite 5.0.8 - Build-Tool und Dev-Server
- Web Audio API - 8-Bit Sound-Effekte
- Google Fonts: Press Start 2P - Retro Arcade-Schriftart
- CSS3 - Animationen und Styling


PROJEKTSTRUKTUR
================================================================================

CV_V1_arcade/
├── src/
│   ├── App.jsx                    # Hauptkomponente
│   ├── main.jsx                   # Entry Point
│   ├── components/
│   │   ├── ArcadeBackground.jsx   # Tron-Style Hintergrund
│   │   ├── ArcadeMachine.jsx      # Wiederverwendbare Automat-Komponente
│   │   ├── HighscoreTable.jsx     # Highscore-Anzeige
│   │   ├── CoinStack.jsx          # Münzstapel-Animation
│   │   ├── Joystick.jsx           # Joystick-Navigation
│   │   ├── SoundToggle.jsx        # Sound ON/OFF
│   │   ├── GameOverScreen.jsx     # Download-Screen
│   │   ├── EasterEgg.jsx          # Secret Level
│   │   ├── ConfettiExplosion.jsx  # Confetti-Animation
│   │   └── games/
│   │       ├── PongGame.jsx
│   │       ├── SpaceInvadersGame.jsx
│   │       ├── ReactionGame.jsx
│   │       └── PowerUpGame.jsx
│   ├── data/
│   │   └── resumeData.js          # Lebenslauf-Daten
│   ├── utils/
│   │   └── soundManager.js        # Sound-Manager
│   └── styles/
│       ├── App.css
│       ├── Arcade.css
│       ├── Machine.css
│       ├── Game.css
│       ├── UI.css
│       └── Special.css
├── Public/
│   ├── Fabian_Grabner_Lebenslauf_SE.pdf
│   └── Fabian.jpg
├── index.html
├── vite.config.js
├── package.json
└── README.md


TROUBLESHOOTING
================================================================================

PowerShell Execution Policy Fehler
--------------------------------------------------------------------------------
Problem: Die Ausführung von Skripts auf diesem System ist deaktiviert

Lösung:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process

Oder verwende cmd.exe statt PowerShell:
In cmd.exe:
npm install
npm run dev

npm install Fehler: EBADPLATFORM
--------------------------------------------------------------------------------
Problem: Unsupported platform for inotify@1.4.6

Lösung:
npm install --no-optional

Rollup Fehler: Cannot find module
--------------------------------------------------------------------------------
Problem: Cannot find module @rollup/rollup-win32-x64-msvc

Lösung:
Lösche node_modules und package-lock.json:
rm -rf node_modules package-lock.json

Oder in PowerShell:
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json

Neu installieren:
npm install

Port bereits belegt
--------------------------------------------------------------------------------
Problem: Port 5173 ist bereits in Verwendung

Lösung:
Verwende einen anderen Port:
npm run dev -- --port 3000


ANPASSUNGEN
================================================================================

Um den Lebenslauf mit deinen eigenen Daten zu füllen, bearbeite die Datei:
src/data/resumeData.js


CONTRIBUTING
================================================================================

Contributions sind willkommen! Bitte erstelle einen Pull Request oder öffne 
ein Issue für Vorschläge.


LICENSE
================================================================================

Dieses Projekt ist unter der MIT License lizenziert.


AUTOR
================================================================================

Fabian Grabner

GitHub: https://github.com/aserte2001


DANKSAGUNGEN
================================================================================

- Inspiriert von klassischen Arcade-Spielen der 80er Jahre
- Verwendet die "Press Start 2P" Schriftart von Google Fonts


LINKS
================================================================================

GitHub Repository: https://github.com/aserte2001/CV_V1_arcade


================================================================================

Wenn dir dieses Projekt gefällt, gib ihm einen Star!

================================================================================

