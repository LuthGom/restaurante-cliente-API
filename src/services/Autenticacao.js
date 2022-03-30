
const { sign } = require('jsonwebtoken');
function criaTokenJWT(cliente) {
    const payload = {
        cpf: cliente.cpf
    };
    const token = sign(payload, process.env.CHAVE_JWT, {expiresIn: '15min'})
    return token

}

module.exports = criaTokenJWT;