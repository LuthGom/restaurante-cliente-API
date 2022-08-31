import pkg from "jsonwebtoken";
const { sign } = pkg;
function criaTokenJWT(cliente) {
  const payload = {
    cpf: cliente.cpf,
  };
  const token = sign(payload, process.env.CHAVE_JWT, { expiresIn: "15min" });
  return token;
}

export default criaTokenJWT;
