import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouters from "./router/routes";

dotenv.config();
const app = express();
const PORTA = process.env.PORT || 3000; // Porta padrão caso não esteja no .env

// Configuração do CORS
app.use(cors({
  origin: "*", // Frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());
app.use("/api", authRouters);

app.listen(PORTA, () => {
  console.log(`Servidor executando na porta: ${PORTA}`);
});