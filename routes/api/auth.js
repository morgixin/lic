const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const User = require("../../models/User");

/**
 * @route   POST api/users
 * @desc    Auth User
 * @access  Public
 */
router.post("/", (req, res) => {
  const { apelido, senha } = req.body;

  // Simple Validation
  if (!apelido || !senha) {
    return res.status(400).json({ msg: "Preencha todos os campos" });
  }

  // Check for existing user
  User.findOne({ apelido }).then((user) => {
    if (!user) {
      // if there's a user
      return res.status(400).json({ msg: "Usuário não existente" });
    }

    // Validate senha
    bcrypt.compare(senha, user.senha).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({ msg: "Usuário ou senha incorretos" });
      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              nome: user.nome,
              apelido: user.apelido,
            },
          });
        }
      );
    });
  });
});

/**
 * @route   GET api/adms
 * @desc    GET dados do administrador
 * @access  Private
 */
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-senha")
    .then((user) => res.json(user));
});

module.exports = router;
