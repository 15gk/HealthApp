const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointSchema = new Schema({
  appoint_id: {
    type: String,
    required: true,
    unique: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  doctorId: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required:false,
  },
  endTime: {
    type: String,
    required:false,
  },
});

const AppointModel = mongoose.model("appoint", AppointSchema);
module.exports = AppointModel;
