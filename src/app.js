import express from "express";
const app = express();
import cors from "cors";
import routes from "./routes/clientes-routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json" assert { type: "json" };
import EstrategiasAutenticacao from "./middlewares/estrategias-autenticacao.js";
import db from "./infra/dbPG.js";
EstrategiasAutenticacao.localStrategy();
EstrategiasAutenticacao.BearerStrategy();

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
app.use(routes);

export default app;
