import blacklist from "./blacklist.js";

import { decode } from "jsonwebtoken";
import { createHash } from "crypto";
function geraTokenHash(token) {
  return createHash("sha256").update(token).digest("hex");
}

class ManipulaToken {
  static async adiciona(token) {
    const dataExpiracao = await decode(token).exp;
    const tokenHash = geraTokenHash(token);
    await blacklist.set(tokenHash, "");
    await blacklist.expireAt(tokenHash, dataExpiracao);
  }
  static async contemToken(token) {
    const tokenHash = geraTokenHash(token);
    const resultado = await blacklist.exists(tokenHash);
    return resultado;
  }
}

export default ManipulaToken;
