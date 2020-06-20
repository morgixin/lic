const express = require("express");
const router = express.Router();

// Modelo de observação
const Obs = require("../../models/Observation");

/**
 * @route   GET api/entries
 * @desc    Acessar Todas as Entradas
 * @access  Public
 */
router.get("/", (req, res) => {
  Obs.find()
    .sort({ hora_leitura: -1 })
    .then((obs) => res.json(obs));
});

/**
 * @route   POST api/entries
 * @desc    Adicionar Nova Entrada
 * @access  Public
 */
router.post("/", (req, res) => {
  const newObs = new Obs({
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

  newObs.save().then((obs) => res.json(obs));
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
