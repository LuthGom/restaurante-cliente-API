const Cliente = require("../models/Clientes");
const criaTokenJWT = require("../services/Autenticacao");
const blacklist = require("../../redis/manipula-blacklist");
class ClientesController {
  static async cadastrarCliente(req, res) {
    try {
      const { cpf, nome, telefone, cep, endereco, cidade, uf, email, senha } =
        req.body;
      const novoCliente = new Cliente({
        cpf,
        nome,
        telefone,
        cep,
        endereco,
        cidade,
        uf,
        email,
      });
      await novoCliente.adicionaSenha(senha);
      await novoCliente.cadastrarCliente();
      return res.status(200).json({
        novoCliente: {
          cpf,
          nome,
          telefone,
          cep,
          endereco,
          cidade,
          uf,
          email,
        },
      });
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
        return {
          id: cliente.id,
          cpf: cliente.cpf,
          email: cliente.email,
          nome: cliente.nome,
          telefone: cliente.telefone,
          cep: cliente.cep,
          endereco: cliente.endereco,
          cidade: cliente.cidade,
          uf: cliente.uf,
        };
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
        return {
          id: cliente.id,
          cpf: cliente.cpf,
          email: cliente.email,
          nome: cliente.nome,
          telefone: cliente.telefone,
          cep: cliente.cep,
          endereco: cliente.endereco,
          cidade: cliente.cidade,
          uf: cliente.uf,
        };
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
      const body = req.body;
      const clienteAntigo = await Cliente.buscaPorCpf(cpf);
      // const novaSenhaHashed = await bcrypt.hash(req.body.senha, 12);

      if (body.senhaHash && body.senhaHash !== undefined) {
        body.senhaHash = await Cliente.gerarSenhaHash(body.senhaHash);
      }
      if (clienteAntigo) {
        const clienteAtualizado = new Cliente({
          cpf: body.cpf || clienteAntigo.cpf,
          nome: body.nome || clienteAntigo.nome,
          telefone: body.telefone || clienteAntigo.telefone,
          cep: body.cep || clienteAntigo.cep,
          endereco: body.endereco || clienteAntigo.endereco,
          cidade: body.cidade || clienteAntigo.cidade,
          uf: body.uf || clienteAntigo.uf,
          email: body.email || clienteAntigo.email,
          senhaHash: body.senhaHash || clienteAntigo.senhaHash,
        });

        const resposta = await Cliente.atualizarCliente(cpf, clienteAtualizado);
        res.status(200).json({ clienteAtualizado: clienteAtualizado });
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
  }

  static async deletarCliente(req, res) {
    try {
      const cpf = req.params.cpf;
      const resposta = await Cliente.deletarCliente(cpf);
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
