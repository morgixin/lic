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
  const newEntry = new Entry({
    hora_leitura: req.body.horaLeitura,
    pressao_atm: req.body.pressaoAtm,
    temp_ar: req.body.tempAr,
    temp_max: req.body.tempMax,
    temp_min: req.body.tempMin,
    umid_rel: req.body.umidRel,
    umid_min: req.body.umidMin,
    rad_solar: req.body.radSolar,
    chuva_ac_dia: req.body.chDia,
    direc_vento: req.body.ventoDirecao,
    inten_vento: req.body.ventoInten,
  });

  newEntry.save().then((entry) => res.json(entry));
});

/**
 * @route   UPDATE api/entries
 * @desc    Atualizar uma Entrada
 * @access  Private
 */
// router.put("/:id", (req, res) => {
//     Obs.findById(req.params.id)
//     .then(obs => obs.update())
// })

module.exports = router;
