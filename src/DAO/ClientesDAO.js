class ClientesDAO {
    constructor(db) {
        this.db = db
    }
    insereCliente(novoCliente) {
        return new Promise((resolve, reject) => {
            this.db.run(`INSERT INTO CLIENTES (CPF, NOME, TELEFONE, CEP, ENDERECO, CIDADE, UF, EMAIL, SENHA) VALUES (?,?,?,?,?,?,?,?,?);`,
                [novoCliente.cpf, novoCliente.nome, novoCliente.telefone, novoCliente.cep, novoCliente.endereco, novoCliente.cidade, novoCliente.uf, novoCliente.email, novoCliente.senha],
                (error) => {
                    if (error) {
                        reject({
                            "mensagem": error.message,
                            "erro": true
                        })
                    } else {
                        resolve({
                            "requisicao": novoCliente,
                            "erro": false
                        })
                    }
                })
        })
    }
    pegaTodosClientes() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM CLIENTES;', (error, rows) => {

                if (error) {
                    reject({
                        "mensagem": error.message,
                        "error": true
                    })
                } else {
                    resolve({
                        "clientes": rows,
                        "error": false
                    })
                }
            })
        })
    }

    retornaClientesDesejados(id) {
        const SELECT_BY_ID = `SELECT * FROM CLIENTES WHERE ID = ?`
        return new Promise((resolve, reject) => {
            this.db.all(SELECT_BY_ID, id, (error, rows) => {
                if (error) {
                    reject({
                        "mensagem": error.message,
                        "erro": true
                    })
                } else {
                    resolve({
                        "requisicao": rows,
                        "erro": false
                    })
                }
            })
        })
    }
    deletaCliente(cpf) {
        return new Promise((resolve, reject) => {
            const deletar = `DELETE FROM CLIENTES WHERE CPF = ?`
            this.db.run(deletar, cpf, (error) => {
                if (error) {
                    reject({
                        "mensagem": error.message,
                        "error": true
                    })
                } else {
                    resolve({
                        "mensagem": `Cliente de CPF ${cpf} excluído com sucesso!`,
                        "erro": false
                    })
                }
            })
        })
    }
    buscaPorEmail (email)  {
        const SELECT_BY_EMAIL = `SELECT * FROM CLIENTES WHERE EMAIL = ?`
        return new Promise((resolve, reject) => {
            this.db.get(SELECT_BY_EMAIL, email, (error, rows) => {
                if (error) {
                    reject({
                        "mensagem": error.message,
                        "erro": true
                    })
                } else {
                    resolve({
                        "requisicao": rows,
                        "erro": false
                    })
                }
            })
        })
      }
    atualizaCliente(email, cliente) {

        return new Promise((resolve, reject) => {
            const UPDATE = `
                UPDATE CLIENTES
                SET CPF = ?, NOME = ?, TELEFONE = ?, CEP = ?, ENDERECO = ?, CIDADE = ?, UF = ?, EMAIL = ?, SENHA = ? WHERE EMAIL = ?`
                const array = [...cliente, email]
            this.db.get(UPDATE,
                array,
                (error) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve({
                            "mensagem": `Cliente de email ${email} atualizado com sucesso.`,
                            "cliente": cliente,
                            "erro": false
                        })
                    }
                })
        })

    }
}
module.exports = ClientesDAO
