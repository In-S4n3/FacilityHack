const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

// A nossa blueprint(planta) para cada professional que adicionar-mos
const professionalSchema = new Schema({
  companyName: {type: String},
  nif: {type: Number },
  email: {type: String},
  password: {type: String},
}, {
  timestamps: true
});

const Professional = mongoose.model("Professional", professionalSchema);

module.exports = Professional;