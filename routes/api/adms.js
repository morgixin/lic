const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// Modelo de Administrador
const Adm = require("../../models/Adm");

/**
 * @route   GET api/adms
 * @desc    Acessar Todos os Administradores
 * @access  Public
 */
router.get("/", (req, res) => {
  Adm.find()
    .sort({ nome: -1 })
    .then((adms) => res.json(adms));
});

/**
 * @route   POST api/adms
 * @desc    Criar Novo Administrador
 * @access  Private
 */
router.post("/", (req, res) => {
  const { nome, apelido, matricula, senha } = req.body;

  // Validando
  if (!nome || !apelido || !matricula || !senha) {
    return res.status(400).json({ msg: "Preencha todos os campos" });
  }

  // Checando existência do adm
  Adm.findOne({ apelido }).then((adm) => {
    if (adm) {
      return res.status(400).json({ msg: "Esse usuário já existe" });
    }

    const newAdm = new Adm({
      nome,
      apelido,
      matricula,
      senha,
    });

    // Criando salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newAdm.senha, salt, (err, hash) => {
        if (err) throw err;
        newAdm.senha = hash;
        newAdm.save().then((adm) => {
          jwt.sign(
            { id: adm.id },
            config.get("jwtSecret"),
            {
              expiresIn: 31556952,
            },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                adm: {
                  id: adm.id,
                  nome: adm.nome,
                  apelido: adm.apelido,
                  matricula: adm.matricula,
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
