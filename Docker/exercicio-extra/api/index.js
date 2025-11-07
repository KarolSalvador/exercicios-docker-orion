const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 3000;

// Configuração do Banco de Dados usando Variáveis de Ambiente
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
};

const pool = new Pool(dbConfig);

app.get("/", (req, res) => {
  res.send(
    `Hello from API! Conectando a: ${dbConfig.host || "host não definido"}`
  );
});

// Rota de Health Check: Verifica a conexão com o Banco de Dados
app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({ status: "ok", db: "online" });
  } catch (err) {
    console.error("Erro na conexão com o banco de dados:", err.message);
    res
      .status(503)
      .json({ status: "error", db: "offline", error: err.message });
  }
});

app.listen(port, async () => {
  console.log(`API rodando em http://localhost:${port}`);

  // Log de status de conexão inicial
  try {
    await pool.query("SELECT NOW()");
    console.log("Conexão inicial com o Banco de Dados bem-sucedida!");
  } catch (err) {
    console.error(
      "ATENÇÃO: Falha na conexão inicial com o Banco de Dados:",
      err.message
    );
  }
});
