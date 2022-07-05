const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const {
  localStrategy,
  BearerStrategy,
} = require("./middlewares/estrategias-autenticacao");
const db = require("./infra/dbPG");
localStrategy();
BearerStrategy();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  next();
});
routes(app);

module.exports = app;
