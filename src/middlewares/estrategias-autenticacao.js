import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import  pkg  from "jsonwebtoken";
import Cliente from "../models/Clientes.js";
import { compare } from "bcrypt";
import blacklist from "../../redis/manipula-blacklist.js";
const { verify } = pkg;
class EstrategiasAutenticacao {
  static localStrategy() {
    passport.use(
      new LocalStrategy(
        {
          usernameField: "email",
          passwordField: "senha",
          session: false,
        },
        async (email, senha, done) => {
          try {
            const cliente = await Cliente.buscaPorEmail(email);
            EstrategiasAutenticacao.verificaCliente(cliente);
            await EstrategiasAutenticacao.verificaSenha(
              senha,
              cliente.senhaHash
            );
            done(null, cliente);
          } catch (error) {
            done(error);
          }
        }
      )
    );
  }
  static BearerStrategy() {
    passport.use(
      new BearerStrategy(async (token, done) => {
        try {
          await EstrategiasAutenticacao.verificaTokenBlacklist(token);
          const payload = verify(token, process.env.CHAVE_JWT);
          const cliente = await Cliente.buscaPorCpf(payload.cpf);
          done(null, cliente, { token: token });
        } catch (error) {
          done(error);
        }
      })
    );
  }
  static async verificaTokenBlacklist(token) {
    const tokenNaBlacklist = await blacklist.contemToken(token);
    if (tokenNaBlacklist) {
      throw new Error("Token inválido por logout!");
    }
  }
  static verificaCliente(cliente) {
    if (!cliente) {
      throw new Error("Não existe cliente com esse e-mail!");
    }
  }
  static async verificaSenha(senha, senhaHash) {
    const senhaValida = await compare(senha, senhaHash);
    if (!senhaValida) {
      throw new Error("Email ou senha inválidos!");
    }
  }
}
export default EstrategiasAutenticacao;
