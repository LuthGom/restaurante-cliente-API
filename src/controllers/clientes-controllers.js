const Cliente = require("../models/Clientes");
const ClientesDAO = require("../DAO/ClientesDAO");
const clientes = (app, bd) => {
  const novoClienteDAO = new ClientesDAO(bd);
  app.post("/clientes", async (req, res) => {
    try {
      const body = req.body;
      const novoCliente = new Cliente(
        body.cpf,
        body.nome,
        body.telefone,
        body.cep,
        body.endereco,
        body.cidade,
        body.uf,
        body.email,
        body.senha
      );
      const resposta = await novoClienteDAO.insereCliente(novoCliente);
      res.status(200).json(resposta);
    } catch (error) {
      res.status(400).json({
        message: error.message,
        error: true,
      });
    }
  });
  app.get("/clientes", async (req, res) => {
    try {
      const resposta = await novoClienteDAO.pegaTodosClientes();

      res.status(200).json(resposta);
    } catch (error) {
      res.status(400).json({
        message: error.message,
        error: true,
      });
    }
  });

  app.get("/clientes/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const resposta = await novoClienteDAO.retornaClientesDesejados(id);
      res.status(200).json(resposta);
    } catch (error) {
      res.status(400).json({
        message: error.message,
        error: true,
      });
    }
  });

  app.post("/clientes/login", async (req, res) => {
    try {
      const { email, senha } = req.body;
      const login = await novoClienteDAO.buscaPorEmail(email);
      console.log(login);
      if (!login.requisicao || login.requisicao.SENHA !== senha) {
        return res.status(400).json({
          message: "Email ou senha inválidas!",
          error: true,
        });
      }
      res.status(200).json({
        error: false,
        cliente: {
          id: login.requisicao.ID,
          cpf: login.requisicao.CPF,
          nome: login.requisicao.NOME,
          telefone: login.requisicao.TELEFONE,
          cep: login.requisicao.CEP,
          endereco: login.requisicao.ENDERECO,
          cidade: login.requisicao.CIDADE,
          uf: login.requisicao.UF,
          email: login.requisicao.EMAIL,
          senha: login.requisicao.SENHA,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        error: true,
      });
    }
  });

  app.patch("/clientes/:cpf", async (req, res) => {
    try {
      const cpf = req.params.cpf;
      const body = req.body;
      console.log(body);
      const respostaGet = await novoClienteDAO.buscaPorCpf(cpf);
      console.log(respostaGet);
      const clienteAntigo = respostaGet.requisicao;

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
          body.senha || clienteAntigo.SENHA,
        ];
        const resposta = await novoClienteDAO.atualizaCliente(
          cpf,
          clienteAtualizado
        );
        res.status(200).json(resposta);
      } else {
        res.json({
          mensagem: `Cliente com cpf ${cpf} não encontrado`,
          error: true,
        });
      }
    } catch (error) {
      res.json({
        mensagem: error.message,
        error: true,
      });
    }
  });

  app.delete("/clientes/:cpf", async (req, res) => {
    try {
      const cpf = req.params.cpf;
      const resposta = await novoClienteDAO.deletaCliente(cpf);
      res.status(200).json(resposta);
    } catch (error) {
      res.status(404).json({
        mensagem: error.message,
        erro: true,
      });
    }
  });
};
module.exports = clientes;
