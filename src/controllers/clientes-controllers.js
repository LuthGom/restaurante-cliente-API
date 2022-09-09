import Cliente from "../models/Clientes.js";
import criaTokenJWT from "../services/Autenticacao.js";
import blacklist from "../../redis/manipula-blacklist.js";
import pkg from "jsonwebtoken";

import axios from "axios";
const { verify } = pkg;
class ClientesController {
  static async cadastrarCliente(req, res) {
    try {
      const body = req.body;
      const novoCliente = new Cliente({ ...body });
      await novoCliente.adicionaSenha(body.senha);
      const viaCep = async (cep) => {
        const { data } = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );
        return data;
      };
      const data = await viaCep(novoCliente.cep);
      if (data) {
        await novoCliente.cadastrarCliente();
        return res.status(200).json({
          novoCliente: [
            {
              id: novoCliente.id,
              cpf: novoCliente.cpf,
              email: novoCliente.email,
              nome: novoCliente.nome,
              telefone: novoCliente.telefone,
              cep: novoCliente.cep,
              endereco: `${data.logradouro}, ${data.bairro}, ${data.complemento}`,
              cidade: data.localidade,
              uf: novoCliente.uf,
            },
          ],
        });
      } else {
        throw new Error("Cep não existe!");
      }
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
        message: error,
        error: true,
      });
    }
  }

  static async listarClientePorId(req, res) {
    const id = req.params.id;
    try {
      const resposta = await Cliente.listarClientePorId(id);
      const cliente = {
        id: resposta.requisicao.id,
        cpf: resposta.requisicao.cpf,
        email: resposta.requisicao.email,
        nome: resposta.requisicao.nome,
        telefone: resposta.requisicao.telefone,
        cep: resposta.requisicao.cep,
        endereco: resposta.requisicao.endereco,
        cidade: resposta.requisicao.cidade,
        uf: resposta.requisicao.uf,
      };
      return res.status(200).json({ cliente: cliente });
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
      const token = req.token;
      const payload = verify(token, process.env.CHAVE_JWT);
      const cpf = req.params.cpf;
      if (payload.cpf === cpf) {
        const clienteAtualizado = req.body;
        const dadosAntigos = await Cliente.buscaPorCpf(cpf);

        if (dadosAntigos) {
          await Cliente.atualizarCliente(cpf, dadosAntigos, clienteAtualizado);
          const clienteComDadostualizados = await Cliente.buscaPorCpf(cpf);
          res.status(200).json({
            clienteAtualizado: {
              id: clienteComDadostualizados.id,
              cpf: clienteComDadostualizados.cpf,
              email: clienteComDadostualizados.email,
              nome: clienteComDadostualizados.nome,
              telefone: clienteComDadostualizados.telefone,
              cep: clienteComDadostualizados.cep,
              endereco: clienteComDadostualizados.endereco,
              cidade: clienteComDadostualizados.cidade,
              uf: clienteComDadostualizados.uf,
            },
          });
        }
      } else {
        res.status(404).json({
          mensagem: `Cpf incorreto!`,
          error: true,
        });
      }
    } catch (error) {
      res.status(404).json({
        mensagem: error.message,
        error: true,
      });
    }
  }

  static async deletarCliente(req, res) {
    try {
      const token = req.token;
      const payload = verify(token, process.env.CHAVE_JWT);
      const cpf = req.params.cpf;
      if (payload.cpf === cpf) {
        await Cliente.deletarCliente(cpf);
        res.status(200).json({
          resposta: `Cliente de cpf ${cpf} deletado!`,
          erro: false,
        });
      } else {
        return res.status(404).json({
          mensagem: "O cpf digitado não está cadastrado!",
          erro: true,
        });
      }
    } catch (error) {
      res.status(404).json({
        mensagem: error.message,
        erro: true,
      });
    }
  }
}
export default ClientesController;
