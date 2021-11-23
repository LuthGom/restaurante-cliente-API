const express = require('express')
const app = express()
const port = 3003

const novoCliente = require('novoCliente')

app.listen(port, () => { console.log(`Servidor rodando em htp://localhost:${port}/`);})
module.exports = app
