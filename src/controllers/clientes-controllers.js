const Cliente = require("../models/Clientes");
// const ClientesDAO = require("../DAO/ClientesDAO");
class ClientesController {
  static async cadastrarCliente(req, res) {

    try {
      const { cpf, nome, telefone, cep, endereco, cidade, uf, email, senha } = req.body;
      const novoCliente = new Cliente({ cpf, nome, telefone, cep, endereco, cidade, uf, email, senha });
      await novoCliente.cadastrarCliente();
      return res.status(200).json(novoCliente);
    } catch (error) {
      res.status(400).json({
        message: error.message,
        error: true,
      });
    }
  }

  static async listarTodosOsClientes(req, res) {
    try {
      const resposta = await Cliente.listaTodosOsClientes();

      res.status(200).json(resposta);
    } catch (error) {
      res.status(400).json({
        message: error.message,
        error: true,
      });
    }
  };

  static async listarClientePorId(req, res) {
    const id = req.params.id;
    try {
      const resposta = await Cliente.listarClientePorId(id);
      res.status(200).json(resposta);
    } catch (error) {
      res.status(400).json({
        message: error.message,
        error: true,
      });
    }
  }


  static async login(req, res) {
    try {
      const { email, senha } = req.body;
      const login = await Cliente.buscaPorEmail(email);
      if (!login.EMAIL !== email || login.SENHA !== senha) {
        return res.status(400).json({
          message: "Email ou senha inválidas!",
          error: true,
        });
      }
      res.status(200).json({
        error: false,
        cliente: {
          id: login.ID,
          cpf: login.CPF,
          nome: login.NOME,
          telefone: login.TELEFONE,
          cep: login.CEP,
          endereco: login.ENDERECO,
          cidade: login.CIDADE,
          uf: login.UF,
          email: login.EMAIL,
          senha: login.SENHA,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        error: true,
      });
    }
  }


  static async atualizarCliente(req, res) {
    try {
      const cpf = req.params.cpf;
      const body = req.body;
      const respostaGet = await Cliente.buscaPorCpf(cpf);
      const clienteAntigo = respostaGet;

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
        const resposta = await Cliente.atualizarCliente(
          cpf,
          clienteAtualizado
        );
        res.status(200).json({clienteAtualizado: clienteAtualizado});
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
  };

  static async deletarCliente(req, res) {
    try {
      const cpf = req.params.cpf;
      const resposta = await Cliente.deletarCliente(cpf);
      res.status(200).json({
        resposta: `Cliente de cpf ${cpf} deletado!`,
        erro: false
      });
    } catch (error) {
      res.status(404).json({
        mensagem: error.message,
        erro: true,
      });
    }
  };
}
module.exports = ClientesController;
