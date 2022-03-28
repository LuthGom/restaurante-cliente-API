const Cliente = require("../models/Clientes");
class ClientesController {
  static async cadastrarCliente(req, res) {

    try {
      const { cpf, nome, telefone, cep, endereco, cidade, uf, email, senha } = req.body;
      const novoCliente = new Cliente({ cpf, nome, telefone, cep, endereco, cidade, uf, email });
      await novoCliente.adicionaSenha(senha)
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

   res.status(200).json();
  }


  static async atualizarCliente(req, res) {
    try {
      const cpf = req.params.cpf;
      const body = { ...req.body };
      const clienteAntigo = await Cliente.buscaPorCpf(cpf);
      const novaSenhaHashed = await bcrypt.hash(req.body.senha, 12);


      if (clienteAntigo) {
        const clienteAtualizado = [{
          cpf: body.cpf || clienteAntigo.cpf,
          nome: body.nome || clienteAntigo.nome,
          telefone: body.telefone || clienteAntigo.telefone,
          cep: body.cep || clienteAntigo.cep,
          endereco: body.endereco || clienteAntigo.endereco,
          cidade: body.cidade || clienteAntigo.cidade,
          uf: body.uf || clienteAntigo.uf,
          email: body.email || clienteAntigo.email,
          senha: novaSenhaHashed || clienteAntigo.senha
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
