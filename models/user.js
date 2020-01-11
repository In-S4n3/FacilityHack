const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

// A nossa blueprint(planta) para cada user que adicionar-mos
const userSchema = new Schema({
  firstName: {type: String},
  lastName: {type: String},
  email: {type: String},
  username: {type: String},
  password: {type: String},
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;