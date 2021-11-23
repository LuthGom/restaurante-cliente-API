var id = 0

class novoCliente {
    constructor(cpf, nome, telefone, endereco, cep, cidade, uf, email, senha) {
        this.id = id++
        this.cpf = this.validacaoCPF(cpf)
        this.nome = this.verificaNome(nome)
        this.telefone = this.verificaTelefone(telefone)
        this.endereco = endereco
        this.cep = cep
        this.cidade = cidade
        this.uf = uf
        this.email = email
        this.senha = senha
    }
    validacaoCPF(cpf) {
        cpf = cpf.replace(/\D/g, '')
        let splitCPF = cpf.toString().split('')
        console.log(splitCPF);
        // numeros chaves para algoritmo de validação do CPF. o 10 é utilizado na primeira parte da verificação e o 11 na segunad parte.
        let dez = 10
        let onze = 11
        let arrayVerifUm = []
        let arrayVerifDois = []
        // verificação do primeiro digito para validar o CPF
        for (let i = 0; i < 10; i++) {
            if (dez < 2) {

                break
            } else {
                arrayVerifUm.push(splitCPF[i] * dez--)
                // console.log(multiplicacao);
            }
        }
        const soma1 = arrayVerifUm.reduce((soma1, els) => soma1 + els)
        let primeiraVerificacao = ((soma1 * 10) % 11).toString()
        // verificação do segundo digito para validar o CPF
        for (let j = 0; j < 11; j++) {
            if (onze < 2) {
                break
            } else {
                arrayVerifDois.push(splitCPF[j] * onze--)
            }
        }
        const soma2 = arrayVerifDois.reduce((soma2, els) => soma2 + els)
        // console.log(soma2);
        let segundaVerificacao = ((soma2 * 10) % 11).toString()

        const substituicao1 = filter(() => {
            primeiraVerificacao === 10 || segundaVerificacao === 10
            return 0
        })
        const substituicao2 = filter(() => {
            primeiraVerificacao === 11 || segundaVerificacao === 11
            return 0
        })
        if (primeiraVerificacao === splitCPF[9] && segundaVerificacao === splitCPF[10]) {
            return `Os dígitos retornados são ${primeiraVerificacao}${segundaVerificacao}. O CPF é valido!`
        } else {
            return `Os dígitos retornados são ${primeiraVerificacao}${segundaVerificacao}. o CPF é inválido!`
        }


    }


    verificaNome(nome) {
        if (nome.length < 8) {
            throw new console.error('Campo nome deve ter ao menos 8 caracteres!');
        } else {
            return nome.toUpperCase()
        }
    }
   verificaTelefone(telefone) {
       if(telefone.length < 11){
           throw new console.error('Campo telefone deve contar ao menos 11 digitos!');
       } else {
            return telefone
       }
   }
   verificaCEP(cep) {
       novoCliente.get(`https://ws.apicep.com/cep/:${cep}/:json`, (req,res) =>{
           const json = req.params.json
       })
   }
}
