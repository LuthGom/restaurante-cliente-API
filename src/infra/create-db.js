const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const caminhoArq = path.resolve(__dirname, 'database.db')

const db = new sqlite3.Database(caminhoArq)

const CLIENTES_SCHEMA = `
CREATE TABLE IF NOT EXISTS "CLIENTES"(
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT, 
    "CPF" VARCHAR(11),
    "NOME" varchar(64),
    "TELEFONE" INTEGER,
    "CEP" INTEGER,
    "ENDERECO" varchar(64),
    "CIDADE" varchar(64),
    "UF" varchar(4),
    "EMAIL" varchar(64),
    "SENHA" varchar(64)
    
)`;



function criaTableClient() {
    db.run(CLIENTES_SCHEMA, (error) => {
        if (error) console.log("Erro ao criar tabela de clientes");
    });
}

db.serialize( ()=> {
    criaTableClient();
})