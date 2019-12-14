const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

// Issue details
const issueDetails = new Schema({
  resident: String,
  issueType: String,
  comment: String,
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Issues = mongoose.model("Issues", issueDetails);

module.exports = Issues;