const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  doctorId: String,
  doctorName: String,
  speciality: String,
  noOfYearsExperience: Number,
  imgUrl: String,
});

const Doctor = mongoose.model("doctors", doctorSchema);

module.exports = Doctor;
