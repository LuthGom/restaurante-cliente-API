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
    const id = req.params.id
    const body = req.body

    try {
      const respostaGet = await novoClienteDAO.retornaClientesDesejados(id,body)
      const clienteAntigo = respostaGet.requisicao[0]


      if (clienteAntigo) {
        const clienteAtualizado = new Cliente(
          body.cpf || clienteAntigo.CPF,
          body.nome || clienteAntigo.NOME,
          body.telefone || clienteAntigo.TELEFONE,
          body.cep || clienteAntigo.CEP,
          body.endereco || clienteAntigo.ENDERECO,
          body.cidade || clienteAntigo.CIDADE,
          body.uf || clienteAntigo.UF,
          body.email || clienteAntigo.EMAIL,
          body.senha || clienteAntigo.SENHA,
        )
        const resposta = await novoClienteDAO.atualizaCliente(id, clienteAtualizado)
        res.json(resposta)
      } else {
        res.json({
          "mensagem": `Cliente com cpf "${id} não encontrado`,
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

  app.delete('clientes/:cpf', (req, res) => {
    const cpf = req.params.cpf


    const indexCliente = bd.clientes.findIndex((clientes => clientes.cpf === cpf))

    if (indexCliente > -1) {
      const clienteDeletado = bd.clientes.splice(indexCliente, 1)
      res.json({
        "deletado": clienteDeletado,
        "error": false
      })
    } else {
      res.json({
        "mensagem": `Cliente com cpf "${cpf}" inexistente.`,
        "error": true
      })
    }
  })

}
module.exports = clientes