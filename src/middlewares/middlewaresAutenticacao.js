import passport from "passport";

export default class MiddlewaresAutenticacao {
  static local(req, res, next) {
    passport.authenticate(
      "local",
      { session: false },
      (erro, cliente, info) => {
        if (erro) {
          return res.status(400).json({ erro: erro.message });
        }
        if (!cliente) {
          return res.status(401).json();
        }

        req.user = cliente;
        return next();
      }
    )(req, res, next);
  }
  static bearer(req, res, next) {
    passport.authenticate(
      "bearer",
      { session: false },
      (erro, cliente, info) => {
        if (erro && erro.name === "JsonWebTokenError") {
          return res.status(401).json({ erro: erro.message });
        }

        if (erro && erro.name === "TokenExpiredError") {
          return res
            .status(401)
            .json({ erro: erro.message, expiradoEm: erro.expiredAt });
        }

        if (erro) {
          return res.status(500).json({ erro: erro.message });
        }

        if (!cliente) {
          return res.status(401).json();
        }

        req.token = info.token;
        req.user = cliente;
        return next();
      }
    )(req, res, next);
  }
}
