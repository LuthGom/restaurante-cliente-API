// const { autenticacaoCPF, autenticacaoNome, autenticacaoTelefone, autenticacaoEmail, autenticacaoSenha } = require('../services/Validacoes');

const ClientesDAO = require('../DAO/ClientesDAO');
const Validacoes = require('../services/Validacoes')
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
        this.senha = novoCliente.senha;

        this.todasAsValidacoes();
    }

    async cadastrarCliente() {
        if (!await NovoCliente.buscaPorCpf(this.cpf)) {
            return ClientesDAO.cadastrarCliente(this)
        }
        throw new Error(`O cliente de cpf ${this.cpf} já está cadastrado!`)
    }
    static listaTodosOsClientes() {
        return ClientesDAO.listarTodosOsClientes();
    }
    static listarClientePorId(id) {
        const cliente = ClientesDAO.listarClientePorId(id)
        if (!cliente) {
            throw new Error("Cliente não cadastrado!")
        }
        return cliente;
    }
    static async buscaPorEmail(email) {
        const cliente = await ClientesDAO.buscaPorEmail(email)
        if (!cliente) {
            return null
        }
        return cliente;
    }
    static async buscaPorCpf(cpf) {
        const cliente = await ClientesDAO.buscaPorCpf(cpf)
        if (!cliente) {
            return null;
        }
        return cliente;
    }
    static async atualizarCliente(cpf, cliente) {
        const atualizacaoDeCliente = await ClientesDAO.atualizarCliente(cpf, cliente)
        if (!await NovoCliente.buscaPorCpf(cpf)) {
            throw new Error(`O cliente de cpf ${this.cpf} não está cadastrado!`)
        }
        return atualizacaoDeCliente;
    }
    static async deletarCliente(cpf) {
        if (await NovoCliente.buscaPorCpf(cpf)) {
            await ClientesDAO.deletarCliente(cpf);
        }
        else { throw new Error(`O cliente de cpf ${cpf} não está cadastrado!`) }
    }
    todasAsValidacoes() {
        this.autenticacaoCPF();
        this.autenticacaoNome();
        this.autenticacaoEmail();
        this.autenticacaoTelefone();
        this.autenticacaoSenha();
    }

    autenticacaoCPF() {
        Validacoes.autenticacaoCPF(this.cpf)
    }
    autenticacaoNome() {
        Validacoes.autenticacaoNome(this.nome)
    }
    autenticacaoTelefone() {
        Validacoes.autenticacaoTelefone(this.telefone)
    }

    autenticacaoEmail() {
        Validacoes.autenticacaoEmail(this.email)
    }
    autenticacaoSenha() {
        Validacoes.autenticacaoSenha(this.senha)
    }

}


module.exports = NovoCliente


