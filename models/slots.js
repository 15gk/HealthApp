const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SlotSchema = new Schema({
  doctorId: {
    type: String,
    required: true,
  },
  token: {
    type: Number,
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
});

const SlotModel = mongoose.model("slot", SlotSchema);
module.exports = SlotModel;