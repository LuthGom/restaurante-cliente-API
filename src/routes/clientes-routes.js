const { Router } = require('express');
const router = Router();
const clientesController = require('../controllers/clientes-controllers');
const { local, bearer } = require('../middlewares/middlewaresAutenticacao')

module.exports =
    router
        .post('/cliente', clientesController.cadastrarCliente)
        .post('/cliente/login', local, clientesController.login)
        .get('/cliente/logout', bearer, clientesController.logout)
        .get('/clientes', clientesController.listarTodosOsClientes)
        .get('/cliente/:id', clientesController.listarClientePorId)
        .delete('/cliente/:cpf', bearer, clientesController.deletarCliente)
        .patch('/cliente/:cpf', clientesController.atualizarCliente)
