const db = require("../infra/dbPG");
class ClientesDAO {
  static cadastrarCliente(novoCliente) {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO "CLIENTES" ("cpf", "nome", "telefone", "cep", "endereco", "cidade", "uf", "email", "senhaHash") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);`,
        [
          novoCliente.cpf,
          novoCliente.nome,
          novoCliente.telefone,
          novoCliente.cep,
          novoCliente.endereco,
          novoCliente.cidade,
          novoCliente.uf,
          novoCliente.email,
          novoCliente.senhaHash,
        ],
        (err, res) => {
          if (err) {
            reject({
              mensagem: err.message,
              erro: true,
            });
          }
          return resolve(res.rows);
        }
      );
    });
  }
  static listarTodosOsClientes() {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM "CLIENTES"`, (err, res) => {
        if (err) {
          reject({
            mensagem: err.message,
            erro: true,
          });
        } else {
          resolve({
            clientes: res.rows,
            erro: false,
          });
        }
      });
    });
  }
  static listarClientePorId(id) {
    const SELECT_BY_ID = `SELECT * FROM "CLIENTES" WHERE "id" = $1`;
    return new Promise((resolve, reject) => {
      db.query(SELECT_BY_ID, [id], (err, res) => {
        if (err) {
          reject({
            mensagem: err.message,
            erro: true,
          });
        } else {
          resolve({
            requisicao: res.rows[0],
            erro: false,
          });
        }
      });
    });
  }
  static deletarCliente(cpf) {
    return new Promise((resolve, reject) => {
      const deletar = `DELETE FROM "CLIENTES" WHERE "cpf" = $1`;
      db.query(deletar, [cpf], (err) => {
        if (err) {
          reject({
            mensagem: err.message,
            erro: true,
          });
        } else {
          resolve({
            mensagem: `Cliente de CPF ${cpf} excluído com sucesso!`,
            erro: false,
          });
        }
      });
    });
  }
  static buscaPorEmail(email) {
    const SELECT_BY_EMAIL = `SELECT * FROM "CLIENTES" WHERE "email" = $1`;
    return new Promise((resolve, reject) => {
      db.query(SELECT_BY_EMAIL, [email], (err, res) => {
        if (err) {
          reject({
            mensagem: err.message,
            erro: true,
          });
        }
        resolve(res.rows[0]);
      });
    });
  }
  static buscaPorCpf(cpf) {
    const SELECT_BY_EMAIL = `SELECT * FROM "CLIENTES" WHERE "cpf" = $1`;
    return new Promise((resolve, reject) => {
      db.query(SELECT_BY_EMAIL, [cpf], (err, res) => {
        if (err) {
          reject({
            mensagem: err.message,
            erro: true,
          });
        }
        resolve(res.rows[0]);
      });
    });
  }
  static atualizarCliente(cpf, cliente) {
    return new Promise((resolve, reject) => {
      const UPDATE = `
                UPDATE "CLIENTES"
                SET "cpf" = $1, "nome" = $2, "telefone" = $3, "cep" = $4, "endereco" = $5, "cidade" = $6, "uf" = $7, "email" = $8, "senhaHash" = $9 WHERE "cpf" = $1`;
      db.query(
        UPDATE,
        [
          cliente.cpf,
          cliente.nome,
          cliente.telefone,
          cliente.cep,
          cliente.endereco,
          cliente.cidade,
          cliente.uf,
          cliente.email,
          cliente.senhaHash,
        ],
        (err) => {
          if (err) {
            reject({ erro: err });
          } else {
            resolve({
              mensagem: `Cliente de cpf ${cpf} atualizado com sucesso.`,
              cliente: cliente,
              erro: false,
            });
          }
        }
      );
    });
  }
}
module.exports = ClientesDAO;
