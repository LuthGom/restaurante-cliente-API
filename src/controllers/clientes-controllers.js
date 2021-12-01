const Cliente = require('../models/Clientes')
const ClientesDAO = require('../DAO/ClientesDAO')
const clientes = (app, bd) => {
  const novoClienteDAO = new ClientesDAO(bd)
  app.post('/clientes', async (req, res) => {

    try {
      const body = req.body
      const novoCliente = new Cliente(body.cpf, body.nome, body.telefone, body.cep, body.endereco, body.cidade, body.uf, body.email, body.senha)
      const resposta = await novoClienteDAO.insereCliente(novoCliente)
      res.json(resposta)
    } catch (error) {
      res.json(error)
    }
  })
  app.get('/clientes', async (req, res) => {
    try {
      const resposta = await novoClienteDAO.pegaTodosClientes()

      res.json(resposta)
    } catch {
      res.json(error)
    }
  })

  app.get('/clientes/:id', async (req, res) => {
    const id = req.params.id
    console.log(id);
    try {
      const resposta = await novoClienteDAO.retornaClientesDesejados(id)
      console.log('565s65s6a5s6a5');
      res.json(resposta)
    } catch (error){
      console.log('fuck');
      res.json(error)

    }

  })

  app.put('/clientes/:id', async(req, res) => {
    
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
        console.log(clienteAtualizado);
        const resposta = await novoClienteDAO.atualizaCliente(id, clienteAtualizado)
        res.json(resposta)
      } else {
        res.json({
          "mensagem": `Cliente com id "${id} não encontrado`,
          "error": true
        })
      }
    } catch (error) {
      console.log(error);
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
      res.json(resposta)
    } catch (error) {
      console.log("caral");
      res.status(404).json({

        "mensagem": error.message,
        "erro": true
      })
    }
  })

}
module.exports = clientes