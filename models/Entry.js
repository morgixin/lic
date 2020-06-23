const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ObsSchema = new Schema({
  hora_leitura: {
    type: Date,
    default: Date.now,
    required: true,
  },
  pressao_atm: {
    type: mongoose.Types.Decimal128,
    required: true,
    min: 0,
  },
  temp_ar: {
    type: mongoose.Types.Decimal128,
    required: true,
    min: 0,
  },
  temp_max: {
    type: mongoose.Types.Decimal128,
    min: 0,
  },
  temp_min: {
    type: mongoose.Types.Decimal128,
    min: 0,
  },
  umid_rel: {
    type: Number,
    required: true,
    min: 0,
  },
  umid_min: {
    type: Number,
    min: 0,
  },
  rad_solar: {
    type: Number,
    required: true,
    min: 0,
  },
  chuva_ac_dia: {
    type: mongoose.Types.Decimal128,
    min: 0,
  },
  direc_vento: {
    type: String,
    required: true,
    maxlength: 2,
  },
  inten_vento: {
    type: mongoose.Types.Decimal128,
    required: true,
    min: 0,
  },
});

module.exports = Obs = mongoose.model("entry", ObsSchema);
