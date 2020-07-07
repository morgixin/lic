const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
  hora_leitura: {
    type: Date,
    required: true,
  },
  pressao_atm: {
    type: String,
    required: true,
    min: 0,
  },
  temp_ar: {
    type: String,
    required: true,
    min: 0,
  },
  temp_max: {
    type: String,
    min: 0,
  },
  temp_min: {
    type: String,
    min: 0,
  },
  umid_rel: {
    type: String,
    required: true,
    min: 0,
  },
  umid_min: {
    type: String,
    min: 0,
  },
  rad_solar: {
    type: String,
    required: true,
    min: 0,
  },
  chuva_ac_dia: {
    type: String,
    min: 0,
  },
  direc_vento: {
    type: String,
    required: true,
    maxlength: 3,
  },
  inten_vento: {
    type: String,
    required: true,
    min: 0,
  },
});

module.exports = Entry = mongoose.model("entry", EntrySchema);
