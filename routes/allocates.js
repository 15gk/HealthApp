// appointmentController.js
var express = require('express');
var router = express.Router();
var doctors = require('../resources/doctors');
var User = require("../models/user")
// var users = require('../resources/users');
// var slots = require('../resources/slots');
var Appoint = require("../models/appoint");
var Slot = require("../models/slots");

    //choose speciality
router.get('/choose-speciality', function (req, res, next) {
    const specialties = new Set();
    doctors.forEach(doctor => specialties.add(doctor.speciality));
    res.render('speciality', { title: 'Choose Speciality', specialities:Array.from(specialties) });
});

// Choose Doctor
router.post('/choose-doctor', function (req, res, next) {
    const speciality= req.body.speciality
    filteredDoctors=doctors.filter(doctor => doctor.speciality === speciality);
    res.render('choose-doc', { title: 'Choose Doctor', doctors:filteredDoctors,speciality:speciality});
});

// View Slots
router.post('/view-slots', async function (req, res, next) {
    const doctorId1 = req.body.doctor;
    const slots= await Slot.find()
    const filteredSlots = slots.filter(slot => (slot.doctorId === doctorId1 && slot.status === 'available' ));
    console.log(filteredSlots)
    res.render('viewSlots', { title: 'View Slots', slots: filteredSlots,speciality:req.body.speciality,doctorId:doctorId1});
});

// Personal Information
router.post('/personalInfo', async function (req, res, next) {
    // console.log(req.body)
    const timeSlot = req.body.selectedSlot;
    const selectedSlotObj = JSON.parse(timeSlot);
    // console.log(selectedSlotObj._id)
    // console.log(timeSlot)
    
    const slots = await Slot.find();
    const appoint=await Appoint.find();
    const appointSlot = slots.find(slot => slot._id == selectedSlotObj._id);
    console.log(appointSlot)
    console.log(appointSlot.status)
    console.log(req.user)

     await Slot.findOneAndUpdate(
       { _id: selectedSlotObj._id },
       { $set: { status: "booked" } }
     );
    //here change status into booked 
    console.log(appointSlot.startTime)
    

    res.render("personalInfo", {
      title: "Personal Information",
      speciality: req.body.speciality,
      doctorId: req.body.doctorId,
      appoint_id:`appoint00${appoint.length + 1}`,
      appointSlot,
      status:"booked",
      userId:req.user.userId,
      date:appointSlot.date,
    });
});
router.get('/confirm_page',function(req,res,next){
    res.render('confirm_page',{title:'Confirm Page'})
})



// Appointment Details
router.post('/appointdetails', async function (req, res, next) {
console.log(req.body)
await Appoint.insertMany([req.body])
console.log(req.user)
const appoint= await Appoint.find({userId:req.user.userId})
res.redirect('/allocates/confirm_page')
// res.render('appointDetails', { title: 'Appointment Details', appointList: appoint });
});

router.get("/appointdetails", async function (req, res, next) {
    // const slots=await Slot.find(date)
  console.log(req.user);
  const appoint = await Appoint.find({ userId: req.user.userId });
  console.log(appoint)
  res.render("appointDetails", {
    title: "Appointment Details",
    appointList: appoint,
  });
});

router.get("/appointstatus", async function(req, res,next)  {
  const date = req.query.date;
  const doctorId=req.query.doctorId;
  console.log(req.user);

  const appoint = await Appoint.find({ date, doctorId })
  res.render("appointstatus", { title: "Appoint", appointList: appoint });
});


router.get("/delete/:userId", async function (req, res, next) {
  console.log(req.params.userId);
//   const appoint_id = req.body;

  try {
    // Find the slot by ID
    const AppointToDelete = await Appoint.find({userId :req.params.userId});
    console.log(AppointToDelete)
    // Check if the slot exists
    if (!AppointToDelete) {
      // Slot not found
      return res.redirect("/appointdetails"); // Redirect to the same page or handle as needed
    }

      await Slot.findOneAndUpdate(
         { _id: AppointToDelete[0].slot_id },
         { $set: { status: "available" } }
       );
    
     
    await Appoint.findOneAndDelete({ userId: req.params.userId });

   ///change the status of slot/////
  

    // Fetch the updated slot list
    const appoint = await Appoint.find({userId:req.user.userId });

    // Render the updated slots page
    res.render("appointdetails", {
      title: "Appoint Details",
      appointList: appoint,
      user: req.user,
      redirectUrl: "/allocates/appointdetails",
    });
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error("Error deleting slot:", error);
    res.status(500).send("Internal Server Error");
    // res.redirect("/login")
  }
});
module.exports = router;
