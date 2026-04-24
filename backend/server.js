import express from "express";
import cors from "cors";
import pkg from "pg";

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// ----------- START SESSION -----------
app.get('/', (req, res) => res.send('Backend en línea'));
app.post("/start", async (req, res) => {
  const sessionId = Date.now().toString();
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

  await pool.query(
    "INSERT INTO sessions (id) VALUES ($1)",
    [sessionId]
  );

  res.json({ sessionId });
});

// ----------- TUTOR -----------
app.post("/tutor", async (req, res) => {
  const { input } = req.body;

  // Simulación IA básica
  let response = {
    type: "explanation",
    content: `Explicación sobre: ${input}`
  };

  if (input.includes("pregunta")) {
    response = {
      type: "question",
      content: "¿Cuál es la función del núcleo?",
      extra: {
        options: ["Control celular", "Respiración", "Movimiento"]
      }
    };
  }

  res.json(response);
});

// ----------- ANSWER -----------
app.post("/answer", async (req, res) => {
  const { answer } = req.body;

  res.json({
    correct: answer === "Control celular"
  });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Backend running"));
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
});

