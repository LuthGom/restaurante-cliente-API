const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Cliente = require('../models/Clientes');
const { compare } = require('bcrypt')




class EstrategiasAutenticacao {

    static localStrategy() {
        passport.use(
            new LocalStrategy({
                usernameField: 'email',
                passwordField: 'senha',
                session: false
            }, async (email, senha, done) => {
                try {
                    const cliente = await Cliente.buscaPorEmail(email);
                    EstrategiasAutenticacao.verificaCliente(cliente);
                    await EstrategiasAutenticacao.verificaSenha(senha, cliente.senhaHash);
                    done(null, cliente)
                } catch (error) {
                    done(error);
                }

            })
        )
    }
    static verificaCliente(cliente) {
        if (!cliente) {
            throw new Error("Não existe cliente com esse e-mail!")
        }
    }
    static async verificaSenha(senha, senhaHash) {
        const senhaValida = await compare(senha, senhaHash)
        if (!senhaValida) {
            throw new Error("Email ou senha inválidos!")
        }
    }
}
module.exports = EstrategiasAutenticacao
