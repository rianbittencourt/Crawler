const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3000;

// Cria uma conexão com o banco de dados SQLite
const db = new sqlite3.Database("nome-do-banco-de-dados.db");

// Rota para obter todos os agentes
app.get("/agentes", (req, res) => {
  const sql = "SELECT * FROM agentes";
  db.all(sql, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Rota para obter um agente específico por ID
app.get("/agentes/:id", (req, res) => {
  const sql = "SELECT * FROM agentes WHERE id = ?";
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: "Agente não encontrado" });
    }
    res.json(row);
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
