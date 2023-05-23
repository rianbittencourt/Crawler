const axios = require("axios");
const cheerio = require("cheerio");

const fetchData = async () => {
  const url = "https://www.metasrc.com/valorant/stats/agents";

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const tableRows = $("div#table-scroll table.stats-table tbody tr");

    tableRows.each((index, element) => {
      const agentName = $(element)
        .find("td:nth-child(1) span:first-child")
        .text();
      const tierRate = $(element).find("td:nth-child(3)").text().trim();
      const winRate = $(element).find("td:nth-child(6)").text().trim();
      const pickRate = $(element).find("td:nth-child(7)").text().trim();

      console.log("Agent:", agentName);
      console.log("Tier:", tierRate);
      console.log("Win Rate:", winRate);
      console.log("Pick Rate", pickRate);
      console.log("---");

      const sqlite3 = require("sqlite3").verbose();

      // Cria uma conexão com o banco de dados SQLite
      const db = new sqlite3.Database("nome-do-banco-de-dados.db");

      // Insere os dados no banco de dados
      
      db.run(`CREATE TABLE IF NOT EXISTS agentes (
        agentName TEXT,
        tierRate TEXT,
        winRate TEXT,
        pickRate TEXT
      )`);
      
      const sql =
        "INSERT INTO agentes (agentName, tierRate, winRate, pickRate) VALUES (?, ?, ?, ?)";
      db.run(sql, [agentName, tierRate, winRate, pickRate], function (err) {
        if (err) {
          return console.error(err.message);
        }
        console.log("Dados inseridos com sucesso!");
      });
    });
  } catch (error) {
    console.error("Ocorreu um erro:", error);
  }
};

fetchData();
