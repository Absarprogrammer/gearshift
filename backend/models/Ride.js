const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  start: String,
  destination: String,
  date: String,
  time: String,

  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

module.exports = mongoose.model("Ride", rideSchema);