const Cliente = require("../models/Clientes");
const bcrypt = require('bcrypt')
class ClientesController {
  static async cadastrarCliente(req, res) {

    try {
      const { cpf, nome, telefone, cep, endereco, cidade, uf, email, senha } = req.body;
      const senhaHashed = await bcrypt.hash(senha, 10);
      const novoCliente = new Cliente({ cpf, nome, telefone, cep, endereco, cidade, uf, email, senha: senhaHashed });
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
      const senhaHashed = await bcrypt.compare(senha, login.SENHA)
      if (!login.EMAIL || senhaHashed == false) {
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
      const body = { ...req.body };
      const clienteAntigo = await Cliente.buscaPorCpf(cpf);

      
      const respostaGet = await Cliente.buscaPorCpf(cpf);
      const novaSenhaHashed = await bcrypt.hash(req.body.senha, 10);


      if (clienteAntigo) {
        const clienteAtualizado = [{
          CPF: body.cpf || clienteAntigo.CPF,
          NOME: body.nome || clienteAntigo.NOME,
          TELEFONE: body.telefone || clienteAntigo.TELEFONE,
          CEP: body.cep || clienteAntigo.CEP,
          ENDERECO: body.endereco || clienteAntigo.ENDERECO,
          CIDADE: body.cidade || clienteAntigo.CIDADE,
          UF: body.uf || clienteAntigo.UF,
          EMAIL: body.email || clienteAntigo.EMAIL,
          SENHA: novaSenhaHashed || clienteAntigo.SENHA
        }];
        const resposta = await Cliente.atualizarCliente(
          cpf,
          clienteAtualizado
        );
        res.status(200).json({ clienteAtualizado: clienteAtualizado });
      } else {
        res.json({
          mensagem: `Cliente com cpf ${cpf} não encontrado`,
          error: true,
        });
      }
    } catch (error) {
      console.log(error);
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
