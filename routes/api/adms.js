const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// Modelo de userinistrador
const User = require("../../models/User");

// /**
//  * @route   GET api/users
//  * @desc    Acessar Todos os Usuários
//  * @access  Public
//  */
// router.get("/", (req, res) => {
//   User.find()
//     .sort({ nome: -1 })
//     .then((users) => res.json(users));
// });

/**
 * @route   POST api/users
 * @desc    Criar Novo Usuário
 * @access  Private
 */
router.post("/", (req, res) => {
  const { nome, apelido, matricula, senha } = req.body;

  // Validando
  if (!nome || !apelido || !matricula || !senha) {
    return res.status(400).json({ msg: "Preencha todos os campos" });
  }

  // Checando existência do user
  User.findOne({ apelido }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: "Esse usuário já existe" });
    }

    const newUser = new User({
      nome,
      apelido,
      matricula,
      senha,
    });

    // Criando salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.senha, salt, (err, hash) => {
        if (err) throw err;
        newUser.senha = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            {
              expiresIn: 31556952,
            },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  nome: user.nome,
                  apelido: user.apelido,
                  matricula: user.matricula,
                },
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
