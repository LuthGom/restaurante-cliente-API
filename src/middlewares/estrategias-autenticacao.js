const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer');
const { verify } = require('jsonwebtoken');
const Cliente = require('../models/Clientes');
const { compare } = require('bcrypt')
const blacklist = require('../../redis/manipula-blacklist');



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
    static BearerStrategy() {
        passport.use(
            new BearerStrategy(
                async (token, done) => {
                    try {
                        
                        await EstrategiasAutenticacao.verificaTokenBlacklist(token);
                        const payload = verify(token, process.env.CHAVE_JWT);
                        const cliente = await Cliente.buscaPorCpf(payload.cpf);
                        done(null, cliente, { token: token });
                    } catch (error) {
                        done(error);
                    }
                }
            )
        )
    }
    static async verificaTokenBlacklist(token) {
        const tokenNaBlacklist = await blacklist.contemToken(token);
        if (tokenNaBlacklist) {
            throw new Error("Token inválido por logout!")
        }
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
