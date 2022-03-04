const express = require('express')
const app = express()
const cors = require('cors')

const bd = require('./infra/sqlite-db')

app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    next()
})

module.exports = app;