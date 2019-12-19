const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

// A nossa blueprint(planta) para cada empresas que adicionar-mos
const companySchema = new Schema({
  name: String,
  companyNif: Number,
  address: String,
  typeOfServices: String,
  yearsOfactivity: Number,
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;