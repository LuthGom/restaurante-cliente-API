const Cliente = require('../models/Clientes')
const ClientesDAO = require('../DAO/ClientesDAO')
const clientes = (app, bd) => {
  const novoClienteDAO = new ClientesDAO(bd)
  app.get('/clientes', (req, res) => {
    novoClienteDAO.pegaTodosClientes()
      .then((resposta) => {
        res.json(resposta)
      })
      .catch((erro) => {
        res.json(erro)
      })
  })
  app.post('/clientes', (req, res) => {

    try {
      const body = req.body
      const novoCliente = new Cliente(body.cpf, body.nome, body.telefone, body.cep, body.endereco, body.cidade, body.uf, body.email, body.senha)
      novoClienteDAO.insereCliente(novoCliente)
        .then((resposta) => {
          console.log('oka');
          res.send(resposta)
        })
        .catch((erro) => {
          res.send(erro)
        })
    } catch (error) {
      console.log(error);
      res.json({
        "m": error.message,
        "erro": true
      })
    }
  })

}
module.exports = clientes