const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

// A nossa blueprint(planta) para cada edificio que adicionar-mos
const buildingSchema = new Schema({
  name: String,
  buildingNif: Number,
  address: String,
  builder: String,
  floors: Number,
  numOfApartments: Number,
  yearOfConstruction: String,
  numOfElevators: Number,
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Building = mongoose.model("Building", buildingSchema);

module.exports = Building;