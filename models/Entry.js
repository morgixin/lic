const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
  hora_leitura: {
    type: Date,
    default: Date.now,
    required: true,
  },
  pressao_atm: {
    type: Number,
    required: true,
    min: 0,
  },
  temp_ar: {
    type: Number,
    required: true,
    min: 0,
  },
  temp_max: {
    type: Number,
    min: 0,
  },
  temp_min: {
    type: Number,
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
    type: Number,
    min: 0,
  },
  direc_vento: {
    type: String,
    required: true,
    maxlength: 3,
  },
  inten_vento: {
    type: Number,
    required: true,
    min: 0,
  },
});

module.exports = Entry = mongoose.model("entry", EntrySchema);
