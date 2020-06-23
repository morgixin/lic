const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // Checando existencia do token
  if (!token)
    return res.status(401).json({ msg: "não há token, autorização negada" });

  try {
    // Verificando o token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // Adiciona adm passado na payload
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ msg: "Token is not valid" });
  }
}

module.exports = auth;
