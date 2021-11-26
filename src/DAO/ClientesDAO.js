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
            this.db.all(SELECT_BY_ID,id, (error, rows) => {
                if(error) {
                    reject ({
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
    atualizaCliente(id, cliente) {
        try {
            const UPDATE = `
            UPDATE CLIENTES
            SET CPF = ?, NOME = ?, TELEFONE = ?, CEP = ?, ENDERECO = ?, CIDADE = ?, UF = ?, EMAIL = ?, SENHA = ?`
            return new Promise ((resolve, reject)=> {
                this.db.run(UPDATE, [cliente.cpf, cliente.nome, cliente.telefone, cliente.cep, cliente.endereco, cliente.cidade, cliente.uf, cliente.email, cliente.senha],id,
                    (error)=>{
                        if(error) {
                            reject(error)
                        } else {
                            resolve({
                                "mensagem": `Cliente de id ${id} atualizado com sucesso.`,
                                "usuario": cliente,
                                "erro": false
                            })
                        }
                    })
            })
        } catch (error){
            console.log(Error);
            throw new Error(error.message)
        }
    }
}
module.exports = ClientesDAO
