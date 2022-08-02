import { Router } from "express";
const clientesRoutes = Router();
import clientesController from "../controllers/clientes-controllers.js";
import MiddlewaresAutenticacao from "../middlewares/middlewaresAutenticacao.js";
clientesRoutes
  .post("/cliente", clientesController.cadastrarCliente)
  .post(
    "/cliente/login",
    MiddlewaresAutenticacao.local,
    clientesController.login
  )
  .get(
    "/cliente/logout",
    MiddlewaresAutenticacao.bearer,
    clientesController.logout
  )
  .get("/clientes", clientesController.listarTodosOsClientes)
  .get("/cliente/:id", clientesController.listarClientePorId)
  .delete(
    "/cliente/:cpf",
    MiddlewaresAutenticacao.bearer,
    clientesController.deletarCliente
  )
  .patch(
    "/cliente/:cpf",
    MiddlewaresAutenticacao.bearer,
    clientesController.atualizarCliente
  );

export default clientesRoutes;
