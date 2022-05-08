const db = require('../infra/sqlite-db')
class ClientesDAO {

    static cadastrarCliente(novoCliente) {
        return new Promise((resolve, reject) => {
            db.all(`INSERT INTO CLIENTES (cpf, nome, telefone, cep, endereco, cidade, uf, email, senhaHash) VALUES (?,?,?,?,?,?,?,?,?);`,
                [...Object.values(novoCliente)],
                (error, rows) => {
                    if (error) {
                        reject({
                            "mensagem": error.message,
                            "erro": true
                        })
                    }
                    return resolve({ "return": rows });

                })
        })
    }
    static listarTodosOsClientes() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM CLIENTES;', (error, rows) => {

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

    static listarClientePorId(id) {
        const SELECT_BY_ID = `SELECT * FROM CLIENTES WHERE ID = ?`
        return new Promise((resolve, reject) => {
            db.all(SELECT_BY_ID, id, (error, rows) => {
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
    static deletarCliente(cpf) {
        return new Promise((resolve, reject) => {
            const deletar = `DELETE FROM CLIENTES WHERE CPF = ?`
            db.run(deletar, cpf, (error) => {
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
    static buscaPorEmail(email) {
        const SELECT_BY_EMAIL = `SELECT * FROM CLIENTES WHERE EMAIL = ?`
        return new Promise((resolve, reject) => {
            db.get(SELECT_BY_EMAIL, email, (error, rows) => {
                if (error) {
                    reject({
                        "mensagem": error.message,
                        "erro": true
                    })
                } else {
                    resolve(rows)
                }
            })
        })
    }
    static buscaPorCpf(cpf) {
        const SELECT_BY_EMAIL = `SELECT * FROM CLIENTES WHERE CPF = ?`
        return new Promise((resolve, reject) => {
            db.get(SELECT_BY_EMAIL, cpf, (error, rows) => {
                if (error) {
                    reject({
                        "mensagem": error.message,
                        "erro": true
                    })
                }
                resolve(rows)

            })
        })
    }
    static atualizarCliente(cpf, cliente) {

        return new Promise((resolve, reject) => {
            const UPDATE = `
                UPDATE CLIENTES
                SET cpf = ?, nome = ?, telefone = ?, cep = ?, endereco = ?, cidade = ?, uf = ?, email = ?, senhaHash = ? WHERE cpf = ?`
            const array = [...Object.values(cliente), cpf]
            db.run(UPDATE,
                array,
                (error) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve({
                            "mensagem": `Cliente de cpf ${cpf} atualizado com sucesso.`,
                            "cliente": cliente,
                            "erro": false
                        })
                    }
                })
        })

    }
}
module.exports = ClientesDAO
