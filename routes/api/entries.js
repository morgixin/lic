const express = require("express");
const router = express.Router();

// Modelo de observação
const Entry = require("../../models/Entry");

/**
 * @route   GET api/entries
 * @desc    Acessar Todas as Entradas
 * @access  Public
 */
router.get("/", (req, res) => {
  Entry.find()
    .sort({ hora_leitura: -1 })
    .then((entry) => res.json(entry));
});

/**
 * @route   POST api/entries
 * @desc    Adicionar Nova Entrada
 * @access  Public
 */
router.post("/", (req, res) => {
  const {
    hora_leitura,
    pressao_atm,
    temp_ar,
    temp_min,
    temp_max,
    umid_rel,
    umid_min,
    rad_solar,
    chuva_ac_dia,
    inten_vento,
    direc_vento,
    tempo_presente,
    nome,
    matricula,
  } = req.body;

  const nome_usuario = nome;
  const mat_usuario = matricula;

  Entry.findOne({ hora_leitura }).then((isMatch) => {
    if (isMatch)
      return res
        .status(400)
        .json({ msg: "Uma entrada com essa data já existe" });
    else {
      const newEntry = new Entry({
        hora_leitura,
        pressao_atm,
        temp_ar,
        temp_min,
        temp_max,
        umid_rel,
        umid_min,
        rad_solar,
        chuva_ac_dia,
        inten_vento,
        direc_vento,
        tempo_presente,
        nome_usuario,
        mat_usuario,
      });
      newEntry.save().then((entry) => res.json(entry));
    }
  });
});

/**
 * @route   UPDATE api/entries
 * @desc    Atualizar uma Entrada
 * @access  Private
 */

router.put("/:id", (req, res) => {
  const {
    hora_leitura,
    pressao_atm,
    temp_ar,
    temp_min,
    temp_max,
    umid_rel,
    umid_min,
    rad_solar,
    chuva_ac_dia,
    inten_vento,
    direc_vento,
  } = req.body;

  Entry.findById(req.params.id).then((entry) => entry.update());
});

module.exports = router;
