# Website Online Stellen (Render)

## Lokal starten

1. API-Key in `.env` eintragen:

   OPENAI_API_KEY=DEIN_ECHTER_KEY

2. Server starten:

   npm.cmd start

3. Website oeffnen:

   http://localhost:3001

## Online veroeffentlichen mit Render

1. Projekt zu GitHub pushen.
2. Auf https://render.com einloggen.
3. `New +` -> `Web Service` waehlen.
4. GitHub-Repository verbinden.
5. Einstellungen:
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Umgebungsvariable setzen:
   - Key: `OPENAI_API_KEY`
   - Value: dein echter OpenAI-Key
7. Deploy starten.

Nach dem Deploy ist die Website unter deiner Render-URL erreichbar. Der Chat nutzt automatisch `/chat` auf derselben Domain.
