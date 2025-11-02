import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const HF_TOKEN = "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"; // replace with your own token
const API_URL = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium";

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: message })
    });

    const data = await response.json();
    const reply = data.generated_text || data[0]?.generated_text || "No response";

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error connecting to Hugging Face API" });
  }
});

app.listen(10000, () => console.log("Server running on port 10000"));