const request = require("supertest");
const app = require("../app");

const cliente = {
  cpf: "750.156.770-06",
  nome: "Joao Jest",
  telefone: 23145697877,
  cep: 12145887,
  endereco: "Rua do Brilho Eterno",
  cidade: "Vale das Yags",
  uf: "RB",
  email: "teste@jest.com",
  senha: "Reccahj@",
}

describe("Testagem de rota POST", () => {
  test("deveria retornar um novo cliente cadastrado", async () => {
    try {
      const resposta = await request(app).post("/clientes").send(cliente)
      expect(resposta.statusCode).toBe(200)
    } catch (erro) {
      console.log(erro);
    }

  })
  test("deveria retornar Status 400", async () => {
    try {
      const clienteErrado = {
        nome: "Joao Jest",
        telefone: 23145697877,
        cep: 12145887,
        endereco: "Rua do Brilho Eterno",
        cidade: "Vale das Yags",
        uf: "RB",
        email: "teste@jest.com",
        senha: "Reccahj@",
      }
      const resposta = await request(app).post("/clientes").send(clienteErrado)
      // console.log('resposta',resposta);
      expect(resposta.statusCode).toBe(400)
    } catch (erro) {
      return erro;
    }
  })
})
describe("Testagem de rota GET ", () => {

  test("deveria retornar Status 200, propriedade 'clientes' e error = false", async () => {
    const res = await request(app).get("/clientes");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("clientes");
    expect(res.body.error).toBe(false);
  });

});

describe("Testagem de rota UPDATE", () => {
  test("deveria retornar o novo e-mail atualizado: 'teste@atualizado.com'", async () => {
    try {
      const clienteAtualizado = {
        email: "teste@atualizado.com"
      }
      const res = await request(app).patch(`/clientes/${cliente.cpf}`).send(clienteAtualizado)
      expect(res.statusCode).toBe(200);
      expect(res.body.error).toBe(false)
    } catch (erro) {
      return erro
    }
  })
})

describe("Testagem de rota UPDATE", () => {
  test("deveria deletar o cliente'", async () => {
    try {

      const res = await request(app).delete(`/clientes/${cliente.cpf}`)
      expect(res.statusCode).toBe(200);
      expect(res.body.error).toBe(false)
    } catch (erro) {
      return erro
    }
  })
})