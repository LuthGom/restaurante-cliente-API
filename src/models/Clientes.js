var id = 0

class novoCliente {
    constructor(cpf, nome, telefone, cep, uf, email, senha) {
        this.id = id++
        this.cpf = this.autenticacaoCPF(cpf)
        this.nome = this.autenticacaoNome(nome)
        this.telefone = this.autenticacaoTelefone(telefone)
        this.endereco = this.autenticacaoCEP(logradouro)
        this.cep = this.autenticacaoCEP(cep)
        this.cidade = this.autenticacaoCEP(localidade)
        this.uf = this.autenticacaoCEP(uf)
        this.email = this.autenticacaoEmail(email)
        this.senha = this.autenticacaoSenha(senha)
    }
    autenticacaoCPF(cpf) {
        cpf = cpf.replace(/\D/g, '')
        let splitCPF = cpf.toString().split('')
        console.log(splitCPF);
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
                // console.log(multiplicacao);
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
        // console.log(soma2);
        let segundaAutenticacao = ((soma2 * 10) % 11).toString()

        const substituicao1 = filter(() => {
            primeiraAutenticacao === 10 || segundaAutenticacao === 10
            return 0
        })
        const substituicao2 = filter(() => {
            primeiraAutenticacao === 11 || segundaAutenticacao === 11
            return 0
        })
        if (primeiraAutenticacao === splitCPF[9] && segundaAutenticacao === splitCPF[10]) {
            return `Os dígitos retornados são ${primeiraAutenticacao}${segundaAutenticacao}. O CPF é valido!`
        } else {
            return `Os dígitos retornados são ${primeiraAutenticacao}${segundaAutenticacao}. o CPF é inválido!`
        }


    }


    autenticacaoNome(nome) {
        if (nome.length < 8) {
            throw new console.error('Campo nome deve ter ao menos 8 caracteres!');
        } else {
            return nome.toUpperCase()
        }
    }
    autenticacaoTelefone(telefone) {
        if (telefone.length < 11) {
            throw new console.error('Campo telefone deve contar ao menos 11 digitos!');
        } else {
            return telefone
        }
    }
    autenticacaoCEP(atributo) {
        async cep => {
            const resposta = await fetch(`viacep.com.br/ws/${cep}/json/`)
            console.log(resposta);
            const data = await resposta.json()
            console.log(data);
            if (atributo === cep) return atributo.cep
            else if (atributo === logradouro) return atributo.logradouro
            else if (atributo === cidade) return atributo.localidade
            else if (atributo === uf) return atributo.uf
        }
        return this.cep
    }
    autenticacaoEmail(email) {
        const mail = /\S+@\S+\.\S+/
        mail.test(email)
        return email
    }
    autenticacaoSenha(senha) {
        const retorno = false
        const letrasMaiusculas = /[A-Z]/
        const letrasMinisculas = /[a-z]/
        const numeros = /[0-9]/
        const caracteresEspeciais = /[!|@|#|$|%|^|&|*|(|)|-|_]/
        if (senha.length !== 8) { return retorno }
        else { console.log(senha); }
        let auxMa = 0
        let auxMin = 0
        let auxNum = 0
        let auxCEspeciais = 0
        for (let i = 0; i < senha.length; i++) {
            if (letrasMaiusculas.test(senha[i])) {
                auxMa++
            }
            else if (letrasMinisculas.test(senha[i])) {
                auxMin++
            }
            else if (numeros.test(senha[i])) {
                auxNum++
            }
            else if (caracteresEspeciais.test(senha[i])) {
                auxCEspeciais++
            }
      
        auxMa > 0 (
            auxMin > 0 (
                auxNum > 0 (
                    auxCEspeciais > 0 ? retorno = true : retorno
                )
            )
        )
        return retorno
        }
    }
}


