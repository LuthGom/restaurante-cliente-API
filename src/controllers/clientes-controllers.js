const Cliente = require('../models/Clientes')
const ClienteDAO = require('../DAO/ClientesDAO')
const clientes = (app, bd) => {
  const novoClienteDAO = new ClienteDAO(bd)
  app.get('/clientes/', (req, res)=> {
    novoClienteDAO.pegaTodosClientes()
    .then((resposta) => {
      res.json(resposta)
    })
    .catch((erro) => {
      res.json(erro)
    })
  })
  app.post('/clientes', async(req, res) =>{
  
    try{
      const body = req.body
      const novoCliente = new Cliente(body.cpf, body.nome, body.telefone, body.cep, body.logradouro, body.localidade, body.uf, body.email, body.senha)
      novoClienteDAO.insereCliente(novoCliente)
      .then((resposta)=>{
        res.json(resposta)
      })
      .catch((erro)=>{
        res.json(erro)
      })
    } catch (error) {
      console.log(error);
      res.json({
        "mensagem": error.message,
        "erro": true
      })
    }
  })
}
module.exports = clientes