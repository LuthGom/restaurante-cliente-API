const request = require("supertest");
const app = require("../../app");


describe("GET test", () => {
  test("validação de rotas retorna true", async () => {
    const res = await request(app).get("/clientes");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("clientes");
    expect(res.body.error).toBe(false);
  });
});
