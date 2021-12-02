const Cliente = require('../models/Clientes')
const ClientesDAO = require('../DAO/ClientesDAO')
const clientes = (app, bd) => {
  const novoClienteDAO = new ClientesDAO(bd)
  app.post('/clientes', async (req, res) => {

    try {
      const body = req.body
      const novoCliente = new Cliente(body.cpf, body.nome, body.telefone, body.cep, body.endereco, body.cidade, body.uf, body.email, body.senha)
      const resposta = await novoClienteDAO.insereCliente(novoCliente)
      res.status(200).json(resposta)
    } catch (error) {
      res.status(400).json({
        "message": error.message,
        "error": true
      })
    }
  })
  app.get('/clientes', async (req, res) => {
    try {
      const resposta = await novoClienteDAO.pegaTodosClientes()

      res.status(200).json(resposta)
    } catch (error){
      res.status(400).json({
        "message": error.message,
        "error": true
      })
    }
  })

  app.get('/clientes/:id', async (req, res) => {
    const id = req.params.id
    try {
      const resposta = await novoClienteDAO.retornaClientesDesejados(id)
      res.status(200).json(resposta)
    } catch (error){
      res.status(400).json({
        "message": error.message,
        "error": true
      })

    }

  })

  app.patch('/clientes/:id', async(req, res) => {
    
    try {
      const id = req.params.id
      const body = req.body
      const respostaGet = await novoClienteDAO.retornaClientesDesejados(id,body)
      const clienteAntigo = respostaGet.requisicao[0]


      if (clienteAntigo) {
        const clienteAtualizado = [
          body.cpf || clienteAntigo.CPF,
          body.nome || clienteAntigo.NOME,
          body.telefone || clienteAntigo.TELEFONE,
          body.cep || clienteAntigo.CEP,
          body.endereco || clienteAntigo.ENDERECO,
          body.cidade || clienteAntigo.CIDADE,
          body.uf || clienteAntigo.UF,
          body.email || clienteAntigo.EMAIL,
          body.senha || clienteAntigo.SENHA
        ]
        const resposta = await novoClienteDAO.atualizaCliente(id, clienteAtualizado)
        res.status(200).json(resposta)
      } else {
        res.json({
          "mensagem": `Cliente com id "${id} não encontrado`,
          "error": true
        })
      }
    } catch (error) {
      res.json({
        "mensagem": error.message,
        "error": true
      })
    }
  })

  app.delete('/clientes/:id', async (req, res) => {
    try {
      const id = req.params.id
      const resposta = await novoClienteDAO.deletaCliente(id)
      res.status(200).json(resposta)
    } catch (error) {
      res.status(404).json({

        "mensagem": error.message,
        "erro": true
      })
    }
  })

}
module.exports = clientes