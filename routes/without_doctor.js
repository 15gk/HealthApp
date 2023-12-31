// appointmentController.js
var express = require("express");
var router = express.Router();
var doctors = require("../resources/doctors");
var users = require("../resources/users");
// var slots = require('../resources/slots');
var Appoint = require("../models/appoint");
var Slot = require("../models/slots");

//choose speciality
router.get("/choose-speciality", function (req, res, next) {
  const specialties = new Set();
  doctors.forEach((doctor) => specialties.add(doctor.speciality));
  res.render("speciality", {
    title: "Choose Speciality",
    specialities: Array.from(specialties),
  });
});

// Choose Doctor
router.post("/choose-doctor", function (req, res, next) {
  const speciality = req.body.speciality;
  filteredDoctors = doctors.filter(
    (doctor) => doctor.speciality === speciality
  );
  res.render("choose-doc", {
    title: "Choose Doctor",
    doctors: filteredDoctors,
    speciality: speciality,
  });
});

// View Slots
router.post("/view-slots", async function (req, res, next) {
  const doctorId1 = req.body.doctor;
  const slots = await Slot.find();
  const filteredSlots = slots.filter(
    (slot) => slot.doctorId === doctorId1 && slot.status === "available"
  );
  console.log(filteredSlots);
  res.render("viewSlots", {
    title: "View Slots",
    slots: filteredSlots,
    speciality: req.body.speciality,
    doctorId: doctorId1,
  });
});

// Personal Information
router.post("/personalInfo", async function (req, res, next) {
  // console.log(req.body)
  const timeSlot = req.body.selectedSlot;
  const selectedSlotObj = JSON.parse(timeSlot);
  console.log(selectedSlotObj._id);
  console.log(timeSlot);

  const slots = await Slot.find();
  const appoint = await Appoint.find();
  const appointSlot = slots.find((slot) => slot._id == selectedSlotObj._id);
  console.log(appointSlot);

  await Slot.findOneAndUpdate(
    { _id: selectedSlotObj._id },
    { $set: { status: "booked" } }
  );
  //here change status into booked
  console.log(appointSlot.startTime);

  res.render("personalInfo", {
    title: "Personal Information",
    speciality: req.body.speciality,
    doctorId: req.body.doctorId,
    timeSlot: timeSlot,
    appoint_id: `appoint00${appoint.length + 1}`,
    appointSlot,
  });
});
router.get("/confirm_page", function (req, res, next) {
  res.render("confirm_page", { title: "Confirm Page" });
});

// Appointment Details
router.post("/appointdetails", async function (req, res, next) {
  const sloted = req.body.timeSlot;
  await Appoint.insertMany([req.body]);
  res.redirect("/confirm_page");
  // res.render('appointDetails', { title: 'Appointment Details', appoint: appoint });
});

module.exports = router;
