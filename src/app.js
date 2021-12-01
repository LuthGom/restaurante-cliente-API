const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bd = require('./infra/sqlite-db')
// Importando os controllers
const cliente = require('./controllers/clientes-controllers')

// importando o banco de dados


// The middlewares
app.use(express.json())
app.use((req, res, next) => {
    console.log('eu fiz isso aqui funcionar, biotch 1');

    next()
})

//rota de cada controller
cliente(app, bd)
app.listen(port, () => { console.log(`Servidor rodando em: http://localhost:${port}/`) })

module.exports = app