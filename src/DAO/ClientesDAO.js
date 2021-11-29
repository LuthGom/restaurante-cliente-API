class ClientesDAO {
    constructor(db) {
        this.db = db
    }
    insereCliente(novoCliente) {
        console.log("DAOINFERNO");
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
                        "count": rows.length,
                        "error": false
                    })
                }
            })
        })
    }

    retornaClientesDesejados(id) {
        console.log(id);
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
    async deletaCliente(id) {
        return new Promise((resolve, reject) => {
            const deletar = `DELETE FROM CLIENTES WHERE ID = ?`
            this.db.run(deletar, id, (erro) => {
                if (erro) {
                    console.log("fuck");
                    reject({
                        "mensagem": erro.message
                    })
                } else {
                    resolve({
                        "mensagem": `Cliente de id ${id} excluído com sucesso!`,
                        "erro": false
                    })
                }
            })
        })
    }
    atualizaCliente(id, cliente) {

        return new Promise((resolve, reject) => {
            const UPDATE = `
                UPDATE CLIENTES
                SET CPF = ?, NOME = ?, TELEFONE = ?, CEP = ?, ENDERECO = ?, CIDADE = ?, UF = ?, EMAIL = ?, SENHA = ? WHERE ID = ?`
                const array = [...cliente, id]
                console.log(array);
            this.db.run(UPDATE,
                array,
                (error) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve({
                            "mensagem": `Cliente de id ${id} atualizado com sucesso.`,
                            "cliente": cliente,
                            "erro": false
                        })
                    }
                })
        })

    }
}
module.exports = ClientesDAO
