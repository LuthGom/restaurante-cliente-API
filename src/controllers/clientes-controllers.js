const Cliente = require("../models/Clientes");
const criaTokenJWT = require("../services/Autenticacao");
const blacklist = require("../../redis/manipula-blacklist");
class ClientesController {
  static async cadastrarCliente(req, res) {
    try {
      const body = req.body;
      const novoCliente = new Cliente({ ...body });
      await novoCliente.adicionaSenha(body.senha);
      await novoCliente.cadastrarCliente();
      return res
        .status(200)
        .json({ novoCliente: Cliente.retornoRequisicoes(novoCliente) });
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
      const cliente = resposta.clientes.map((cliente) => {
        return Cliente.retornoRequisicoes(cliente);
      });
      res.status(200).json({ clientes: cliente });
    } catch (error) {
      res.status(400).json({
        message: error.message,
        error: true,
      });
    }
  }

  static async listarClientePorId(req, res) {
    const id = req.params.id;
    try {
      const resposta = await Cliente.listarClientePorId(id);
      const cliente = resposta.requisicao.map((cliente) => {
        return Cliente.retornoRequisicoes(cliente);
      });
      res.status(200).json({ cliente: cliente });
    } catch (error) {
      res.status(400).json({
        message: error.message,
        error: true,
      });
    }
  }

  static async login(req, res) {
    const token = criaTokenJWT(req.user);
    res.set("Authorization", token);
    res.status(204).json();
  }

  static logout(req, res) {
    try {
      const token = req.token;
      blacklist.adiciona(token);
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  static async atualizarCliente(req, res) {
    try {
      const cpf = req.params.cpf;
      const clienteAtualizado = req.body;
      const dadosAntigos = await Cliente.buscaPorCpf(cpf);

      if (dadosAntigos) {
        await Cliente.atualizarCliente(cpf, dadosAntigos, clienteAtualizado);
        const clienteComDadostualizados = await Cliente.buscaPorCpf(cpf);
        res.status(200).json({
          clienteAtualizado: Cliente.retornoRequisicoes(
            clienteComDadostualizados
          ),
        });
      } else {
        res.json({
          mensagem: `Cliente com cpf ${cpf} não encontrado`,
          error: true,
        });
      }
    } catch (error) {
      res.status(401).json({
        mensagem: error.message,
        error: true,
      });
    }
  }

  static async deletarCliente(req, res) {
    try {
      const cpf = req.params.cpf;
      await Cliente.deletarCliente(cpf);
      res.status(200).json({
        resposta: `Cliente de cpf ${cpf} deletado!`,
        erro: false,
      });
    } catch (error) {
      res.status(404).json({
        mensagem: error.message,
        erro: true,
      });
    }
  }
}
module.exports = ClientesController;
