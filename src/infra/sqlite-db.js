const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const caminhoArq = path.resolve(__dirname, 'database.db')

const db = new sqlite3.Database(caminhoArq)

const CLIENTES_SCHEMA = `
CREATE TABLE IF NOT EXISTS "CLIENTES"(
    "id" INTEGER PRIMARY KEY AUTOINCREMENT, 
    "cpf" VARCHAR(11),
    "nome" VARCHAR(64),
    "telefone" VARCHAR(11),
    "cep" VARCHAR(11),
    "endereco" VARCHAR(64),
    "cidade" VARCHAR(64),
    "uf" VARCHAR(4),
    "email" VARCHAR(64),
    "senhaHash" VARCHAR(64)
    
)`;



function criaTableClient() {
    db.run(CLIENTES_SCHEMA, (error) => {
        if (error) console.log("Erro ao criar tabela de clientes");
    });
}

db.serialize(() => {
    criaTableClient();


})
process.on('SIGINT', () =>
    db.close(() => {
        process.exit(0);
    })
)
module.exports = db;