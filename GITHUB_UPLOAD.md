# Anleitung: Projekt auf GitHub hochladen

## Voraussetzungen

1. **Git installieren** (falls noch nicht installiert):
   - Download: https://git-scm.com/download/win
   - Installation durchführen
   - Git Bash oder PowerShell verwenden

2. **GitHub-Account erstellen** (falls noch nicht vorhanden):
   - Gehe zu https://github.com
   - Erstelle einen kostenlosen Account

## Schritt-für-Schritt-Anleitung

### 1. Git Repository initialisieren

Öffne PowerShell oder Git Bash im Projektordner und führe aus:

```bash
git init
```

### 2. Alle Dateien hinzufügen

```bash
git add .
```

### 3. Ersten Commit erstellen

```bash
git commit -m "Initial commit: Arcade Resume Portfolio"
```

### 4. GitHub Repository erstellen

1. Gehe zu https://github.com
2. Klicke auf das **"+"** Symbol oben rechts
3. Wähle **"New repository"**
4. Gib einen Repository-Namen ein (z.B. `arcade-resume` oder `lebenslauf-spielehalle`)
5. Wähle **Public** oder **Private**
6. **NICHT** "Initialize with README" ankreuzen (da wir bereits Dateien haben)
7. Klicke auf **"Create repository"**

### 5. Remote Repository verbinden

GitHub zeigt dir nach dem Erstellen einen Befehl wie:
```bash
git remote add origin https://github.com/DEIN-USERNAME/REPOSITORY-NAME.git
```

Ersetze `DEIN-USERNAME` und `REPOSITORY-NAME` mit deinen Werten.

### 6. Code auf GitHub hochladen

```bash
git branch -M main
git push -u origin main
```

Falls du nach Benutzername und Passwort gefragt wirst:
- **Benutzername**: Dein GitHub-Benutzername
- **Passwort**: Du musst ein **Personal Access Token** verwenden (siehe unten)

## Personal Access Token erstellen (für Passwort)

GitHub akzeptiert keine Passwörter mehr, du brauchst ein Token:

1. Gehe zu https://github.com/settings/tokens
2. Klicke auf **"Generate new token"** → **"Generate new token (classic)"**
3. Gib einen Namen ein (z.B. "Mein Computer")
4. Wähle Ablaufzeit (z.B. "No expiration")
5. Wähle Berechtigungen:
   - ✅ `repo` (vollständiger Zugriff auf private Repositories)
6. Klicke auf **"Generate token"**
7. **Kopiere das Token sofort** (es wird nur einmal angezeigt!)
8. Verwende dieses Token als Passwort beim `git push`

## Alternative: GitHub Desktop

Falls die Kommandozeile zu kompliziert ist:

1. Lade **GitHub Desktop** herunter: https://desktop.github.com/
2. Installiere und melde dich mit deinem GitHub-Account an
3. Klicke auf **"File"** → **"Add local repository"**
4. Wähle deinen Projektordner
5. Klicke auf **"Publish repository"** oben rechts
6. Wähle Name und Sichtbarkeit
7. Klicke auf **"Publish repository"**

## Wichtige Dateien

Die `.gitignore`-Datei wurde bereits erstellt und verhindert, dass folgende Dateien hochgeladen werden:
- `node_modules/` (kann mit `npm install` neu installiert werden)
- `.env`-Dateien (mit sensiblen Daten)
- Build-Dateien

## Nach dem Hochladen

Dein Repository ist jetzt auf GitHub verfügbar!

**Wichtig**: Stelle sicher, dass die Datei `Fabian.jpg` im `public/` Ordner ist, damit sie auf GitHub hochgeladen wird.

## Nächste Schritte

- Erstelle eine `README.md` mit Projektbeschreibung
- Füge Screenshots hinzu
- Aktiviere GitHub Pages für eine Live-Demo (optional)

