const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SlotSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  doctorId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "booked"],
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Assuming userId is ObjectId
    ref: "user", // Reference to UserModel
  },
});

const SlotModel = mongoose.model("slot", SlotSchema);
module.exports = SlotModel;
