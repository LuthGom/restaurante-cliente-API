const { Client } = require("pg");

const db = new Client({
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  port: process.env.PG_PORT,
  password: process.env.PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  }
});

const execute = async (query) => {
  try {
    await db.connect();
    await db.query(query);
    return true;
  } catch (err) {
    console.error(err.stack);
    return false;
  }
};

const createTableQuery = `
CREATE TABLE IF NOT EXISTS "CLIENTES"(
    "id" SERIAL, 
    "cpf" VARCHAR(11),
    "nome" VARCHAR(64),
    "telefone" VARCHAR(11),
    "cep" VARCHAR(11),
    "endereco" VARCHAR(64),
    "cidade" VARCHAR(64),
    "uf" VARCHAR(4),
    "email" VARCHAR(64),
    "senhaHash" VARCHAR(64),
    PRIMARY KEY ("id")
    
)`;
execute(createTableQuery).then((result) => {
  if (result) {
    console.log("Tabela criada!");
  }
});

module.exports = db;
