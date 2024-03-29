import ClientesDAO from "../DAO/ClientesDAO.js";
import Validacoes from "../services/Validacoes.js";
import { hash } from "bcrypt";

class NovoCliente {
  constructor(novoCliente) {
    this.cpf = novoCliente.cpf;
    this.nome = novoCliente.nome;
    this.telefone = novoCliente.telefone;
    this.cep = novoCliente.cep;
    this.endereco = novoCliente.endereco;
    this.cidade = novoCliente.cidade;
    this.uf = novoCliente.uf;
    this.email = novoCliente.email;
    this.senhaHash = novoCliente.senhaHash;

    this.todasAsValidacoes();
  }

  async cadastrarCliente() {
    if (
      !(await NovoCliente.buscaPorCpf(this.cpf)) &&
      !(await NovoCliente.buscaPorEmail(this.email))
    ) {
      return ClientesDAO.cadastrarCliente(this);
    }
    throw new Error(
      `O cliente de cpf ${this.cpf} e email ${this.email} já está cadastrado!`
    );
  }
  static async listaTodosOsClientes() {
    return await ClientesDAO.listarTodosOsClientes();
  }
  static async listarClientePorId(id) {
    const cliente = await ClientesDAO.listarClientePorId(id);
    if (!cliente) {
      throw new Error("Cliente não cadastrado!");
    }
    return cliente;
  }
  static async buscaPorEmail(email) {
    const cliente = await ClientesDAO.buscaPorEmail(email);
    if (!cliente) {
      return null;
    }
    return cliente;
  }
  static async buscaPorCpf(cpf) {
    const cliente = await ClientesDAO.buscaPorCpf(cpf);
    if (!cliente) {
      return null;
    }
    return cliente;
  }
  static async atualizarCliente(cpf, dadosAntigos, dadosAtualizados) {
    if (await NovoCliente.buscaPorCpf(cpf)) {
      const clienteAtualizado = new NovoCliente({
        cpf: dadosAtualizados.cpf || dadosAntigos.cpf,
        nome: dadosAtualizados.nome || dadosAntigos.nome,
        telefone: dadosAtualizados.telefone || dadosAntigos.telefone,
        cep: dadosAtualizados.cep || dadosAntigos.cep,
        endereco: dadosAtualizados.endereco || dadosAntigos.endereco,
        cidade: dadosAtualizados.cidade || dadosAntigos.cidade,
        uf: dadosAtualizados.uf || dadosAntigos.uf,
        email: dadosAtualizados.email || dadosAntigos.email,
        senhaHash: dadosAtualizados.senhaHash || dadosAntigos.senhaHash,
      });
      if (
        (await NovoCliente.buscaPorEmail(clienteAtualizado.email)) ===
          dadosAntigos.email &&
        (await NovoCliente.buscaPorEmail(clienteAtualizado.email))
      ) {
        throw new Error("Email já cadastrado!");
      }
      if (
        clienteAtualizado.senhaHash !== dadosAntigos.senhaHash &&
        clienteAtualizado.senhaHash !== undefined
      ) {
        clienteAtualizado.senhaHash = await NovoCliente.gerarSenhaHash(
          clienteAtualizado.senhaHash
        );
      }
      await ClientesDAO.atualizarCliente(cpf, clienteAtualizado);
    } else {
      throw new Error(`O cliente de cpf ${this.cpf} não está cadastrado!`);
    }
  }
  static async deletarCliente(cpf) {
    if (await NovoCliente.buscaPorCpf(cpf)) {
      await ClientesDAO.deletarCliente(cpf);
    } else {
      throw new Error(`O cliente de cpf ${cpf} não está cadastrado!`);
    }
  }

  async adicionaSenha(senha) {
    Validacoes.autenticacaoSenha(senha);

    this.senhaHash = await NovoCliente.gerarSenhaHash(senha);
  }
  static gerarSenhaHash(senha) {
    const custo = 12;

    return hash(senha, custo);
  }
  todasAsValidacoes() {
    this.autenticacaoCPF();
    this.autenticacaoNome();
    this.autenticacaoEmail();
    this.autenticacaoTelefone();
  }

  autenticacaoCPF() {
    Validacoes.autenticacaoCPF(this.cpf);
  }
  autenticacaoNome() {
    Validacoes.autenticacaoNome(this.nome);
  }
  autenticacaoTelefone() {
    Validacoes.autenticacaoTelefone(this.telefone);
  }

  autenticacaoEmail() {
    Validacoes.autenticacaoEmail(this.email);
  }
}

export default NovoCliente;
