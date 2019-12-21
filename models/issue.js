const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

// ISSUE
const issueSchema = new Schema({
  building: { type : Schema.Types.ObjectId, ref: 'building' },
  userName: String,
  floor: Number,
  apartment: String,
  issueType: { type: String, enum: ['Cleaning', 'Cracks', 'Elevators', 'Inflitrations', 'Smoke', 'TV Signal', 'Home Appliances', 'Others'] },
  comment: String,
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;