const { Router } = require('express');
const router = Router();
const clientesController = require('../controllers/clientes-controllers');

module.exports =
    router
        .post('/clientes', clientesController.cadastrarCliente)
        .post('clientes/login', clientesController.login)
        .get('/clientes', clientesController.listarTodosOsClientes)
        .get('clientes/:id', clientesController.listarClientePorId)
        .delete('/clientes/:cpf', clientesController.deletarCliente)
        .patch('/clientes/:cpf', clientesController.atualizarCliente)
