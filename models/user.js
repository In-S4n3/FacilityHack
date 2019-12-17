const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

// A nossa blueprint(planta) para cada user que adicionar-mos
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;