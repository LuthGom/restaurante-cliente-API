class novoCliente {
    constructor(cpf, nome, telefone, cep, endereco, cidade, uf, email, senha) {

        this.cpf = novoCliente.autenticacaoCPF(cpf)
        this.nome = novoCliente.autenticacaoNome(nome)
        this.telefone = novoCliente.autenticacaoTelefone(telefone)
        this.cep = cep
        this.endereco = endereco
        this.cidade = cidade
        this.uf = uf
        this.email = novoCliente.autenticacaoEmail(email)
        this.senha = novoCliente.autenticacaoSenha(senha)
    }
    static autenticacaoCPF(cpf) {
        cpf = cpf.replace(/\D/g, '')
        let splitCPF = cpf.toString().split('')
        if (splitCPF.length < 11) {
            throw new Error("Cpf inválido!")
        } else {

            // numeros chaves para algoritmo de validação do CPF. o 10 é utilizado na primeira parte da autenticação e o 11 na segunad parte.
            let dez = 10
            let onze = 11
            let arrayVerifUm = []
            let arrayVerifDois = []
            // autenticação do primeiro digito para validar o CPF
            for (let i = 0; i < 10; i++) {
                if (dez < 2) {

                    break
                } else {
                    arrayVerifUm.push(splitCPF[i] * dez--)
                }
            }
            const soma1 = arrayVerifUm.reduce((soma1, els) => soma1 + els)
            let primeiraAutenticacao = ((soma1 * 10) % 11).toString()
            // autenticação do segundo digito para validar o CPF
            for (let j = 0; j < 11; j++) {
                if (onze < 2) {
                    break
                } else {
                    arrayVerifDois.push(splitCPF[j] * onze--)
                }
            }
            const soma2 = arrayVerifDois.reduce((soma2, els) => soma2 + els)
            let segundaAutenticacao = ((soma2 * 10) % 11).toString()

            primeiraAutenticacao === 10 ? 0 : primeiraAutenticacao === 11 ? 0 : primeiraAutenticacao
            segundaAutenticacao === 10 ? 0 : segundaAutenticacao === 11 ? 0 : segundaAutenticacao
            if (primeiraAutenticacao === splitCPF[9] && segundaAutenticacao === splitCPF[10]) {

                return cpf
            } else {
                throw new Error(`Os dígitos retornados são ${primeiraAutenticacao}${segundaAutenticacao}. o CPF é inválido!`);

            }

        }

    }


    static autenticacaoNome(nome) {
        if (nome.length < 8) {
            throw new error('Campo nome deve ter ao menos 8 caracteres!');
        } else {
            return nome.toUpperCase()
        }
    }
    static autenticacaoTelefone(telefone) {
        if (telefone.length < 11) {
            throw new Error('Campo telefone deve contar ao menos 11 digitos!');
        } else {
            return telefone
        }
    }

    static autenticacaoEmail(email) {
        const mail = /\S+@\S+\.\S+/
        mail.test(email)
        return email
    }
    static autenticacaoSenha(senha) {
        let retorno = false
        const letrasMaiusculas = /[A-Z]/
        const letrasMinisculas = /[a-z]/

        const caracteresEspeciais = /[!|@|#|$|%|^|&|*|(|)|-|_]/
        if (senha.length !== 8) {
            return retorno
        } else {
            let auxMa = 0
            let auxMin = 0

            let auxCEspeciais = 0
            for (let i = 0; i < senha.length; i++) {
                if (letrasMaiusculas.test(senha[i])) {
                    auxMa++
                }
                else if (letrasMinisculas.test(senha[i])) {
                    auxMin++
                }

                else if (caracteresEspeciais.test(senha[i])) {
                    auxCEspeciais++
                }

            }

            if (auxMa > 0) {
                if (auxMin > 0) {

                    if (auxCEspeciais > 0) {
                        retorno = true

                    }

                }
            }
            return senha
        }
    }
}


module.exports = novoCliente


