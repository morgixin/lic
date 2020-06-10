const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdmSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  apelido: {
    type: String,
    required: true,
    unique: true,
  },
  matricula: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
});

module.exports = User = mongoose.model("adm", AdmSchema);
