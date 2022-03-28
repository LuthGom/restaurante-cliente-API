const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes');
const EstrategiasAutenticacao = require('./middlewares/estrategias-autenticacao');
const bd = require('./infra/sqlite-db');
EstrategiasAutenticacao.localStrategy();
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    next()
})
routes(app)

module.exports = app;