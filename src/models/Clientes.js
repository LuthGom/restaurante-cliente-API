const { autenticacaoCPF, autenticacaoNome, autenticacaoTelefone, autenticacaoEmail, autenticacaoSenha } = require('../services/Validacoes')
class novoCliente {
    todasAsValidacoes() {
        this.autenticacaoCPF();
        this.autenticacaoNome();
        this.autenticacaoEmail();
        this.autenticacaoTelefone();
        this.autenticacaoSenha();
    }

    autenticacaoCPF() {
        return autenticacaoCPF(this.cpf)
    }
    autenticacaoNome() {
        return autenticacaoNome(this.nome)
    }
    autenticacaoTelefone() {
        autenticacaoTelefone(this.telefone)
    }

    autenticacaoEmail() {
        return autenticacaoEmail(this.email)
    }
    autenticacaoSenha() {
        return autenticacaoSenha(this.senha)
    }
    constructor(cpf, nome, telefone, cep, endereco, cidade, uf, email, senha) {

        this.cpf = cpf;
        this.nome = nome;
        this.telefone = telefone;
        this.cep = cep;
        this.endereco = endereco;
        this.cidade = cidade;
        this.uf = uf;
        this.email = email;
        this.senha = senha;

        this.todasAsValidacoes();
    }
}


module.exports = novoCliente


