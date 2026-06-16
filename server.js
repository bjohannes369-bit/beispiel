import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = Number(process.env.PORT) || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "Nachricht fehlt" });
    }

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "DEIN_API_KEY_HIER") {
      return res.status(500).json({ error: "OPENAI_API_KEY fehlt oder ist ungueltig" });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Du bist ein freundlicher Website-Assistent fuer ein lokales Unternehmen. Antworte kurz, professionell und hilfsbereit.",
        },
        { role: "user", content: userMessage },
      ],
    });

    res.json({
      reply: response.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({ error: "Fehler beim Chatbot" });
  }
});

app.listen(port, () => console.log("Server laeuft auf Port " + port));
