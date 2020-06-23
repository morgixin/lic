const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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

module.exports = Adm = mongoose.model("user", UserSchema);
