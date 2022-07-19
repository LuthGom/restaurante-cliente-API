const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger.json");
const {
  localStrategy,
  BearerStrategy,
} = require("./middlewares/estrategias-autenticacao");
const db = require("./infra/dbPG");
localStrategy();
BearerStrategy();

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get("/terms", (req, res) => {
  return res.json({
    message: "Termos de Serviço",
  });
});
app.use(cors());
app.use((req, res, next) => {
  next();
});
routes(app);

module.exports = app;
