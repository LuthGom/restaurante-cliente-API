class ClientesDAO {
    constructor(bd) {
        this.bd = bd
    }
    pegaTodosClientes() {
        return new Promise ((resolve, reject) => {
            if (error) {
                reject ({
                    "mensagem": error.message,
                    "error": true
                }) 
            } else {
                resolve({
                    "clientes": rows,
                    "count": rows.length,
                    "error": false
                })
            }
        })
    }
    insereCliente(novoCliente) {
        return new Promise ((resolve, reject) => {
            this.bd.run(`INSERT INTO CLIENTES (CPF, NOME, TELEFONE, CEP, ENREDECO, CIDADE, UF, EMAIL, SENHA) VALUES (?,?,?,?,?,?,?,?,?)`, 
            [novoCliente.cpf, novoCliente.nome, novoCliente.telefone, novoCliente.cep, novoCliente.endereco, novoCliente.cidade, novoCliente.uf, novoCliente.email, novoCliente.senha], 
            (error) => {
                if(error) {
                    reject({
                        "mensagem":error.message,
                        "erro":true
                    })
                } else {
                    resolve({
                        "requisicao":novoCliente,
                        "erro":false
                    })
                }
            }) 
        })
    }
}
 module.exports = ClientesDAO
