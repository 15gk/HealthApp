// appointmentController.js
var express = require('express');
var router = express.Router();
var doctors = require('../resources/doctors');
var users = require('../resources/users');
var slots = require('../resources/slots');
// var appointments = require('../resources/appointments');
var appoint=require('../resources/appoint')

router.post('/viewAppoint', function(req, res, next) {
    
    res.render('viewAppoint', { title: 'Slots', appointList:appoint });
  });
router.get('/choose-speciality', function (req, res, next) {
    const specialties = new Set();
    doctors.forEach(doctor => specialties.add(doctor.speciality));
    // console.log(Array.from(specialties))
    res.render('speciality', { title: 'Choose Speciality', specialities:Array.from(specialties) });
});

// Choose Doctor
router.post('/choose-doctor', function (req, res, next) {
    // console.log(req.body);
    const speciality= req.body.speciality

    filteredDoctors=doctors.filter(doctor => doctor.speciality === speciality);
    //  console.log(filteredDoctors);
    // const filteredDoctors = doctors.filter(doctor => doctor.speciality === speciality);
    res.render('choose-doc', { title: 'Choose Doctor', doctors:filteredDoctors,speciality:speciality});
});

// View Slots
router.post('/view-slots', function (req, res, next) {
    // console.log(req.body);
    const doctorId1 = req.body.doctor;
    // console.log(doctorId1)
    // console.log(slots.doctorId1)
    
    const filteredSlots = slots.filter(slot => (slot.doctorId === doctorId1 && slot.status === 'available' ));
    console.log(filteredSlots)
    res.render('viewSlots', { title: 'View Slots', slots: filteredSlots,speciality:req.body.speciality,doctorId:doctorId1});
});

// Personal Information
router.post('/personalInfo', function (req, res, next) {
    console.log(req.body)
    const timeSlot = req.body.selectedSlot;
    console.log(timeSlot)
    
    // const filterSlot= slots.find(slot => (slot._id===timeSlot));
    // console.log(filterSlot)
    // appoint.push({...req.body,id:`00${appoint.length+1}`})

    res.render('personalInfo', { title: 'Personal Information',speciality:req.body.speciality,doctorId:req.body.doctorId,timeSlot:timeSlot});
});
router.get('/confirm_page',function(req,res,next){
    res.render('confirm_page',{title:'Confirm Page'})
})

// Appointment Details
router.post('/appointdetails', function (req, res, next) {
console.log(req.body)
console.log(req.body.timeSlot)
const sloted=req.body.timeSlot
const selectedSlot1=slots.filter(slot=>(slot._id===sloted));
console.log(selectedSlot1)
const startTime = selectedSlot1.startTime;
    appoint.push({...req.body,appoint_id:`00${appoint.length+1}`})
    res.redirect('/allocates/Confirm_page')
    res.render('appointDetails', { title: 'Appointment Details', appoint: appoint });
});

// Update Appointment Status
// router.post('/update-appointment', function (req, res, next) {
//     const appointmentId = req.body.appointmentId;
//     const newStatus = req.body.newStatus;

//     // Replace with your logic to update appointment status
//     const appointmentIndex = appointments.findIndex(appointment => appointment._id === appointmentId);
//     if (appointmentIndex !== -1) {
//         appointments[appointmentIndex].status = newStatus;
//     }

//     res.redirect('/appointment-details'); // Redirect to the updated appointment details page
// });

// Replace with your logic to generate a unique patientId
// function generateUniqueId() {
//     // Implement your unique ID generation logic
//     return 'patient-' + Math.floor(Math.random() * 1000);
// }

// // Replace with your logic to get time slot details by ID
// function getTimeSlotById(timeSlotId) {
//     // Implement your logic to find and return the time slot by ID
//     return slots.find(slot => slot._id === timeSlotId);
// }

module.exports = router;





// var express = require('express');
// var router = express.Router();


// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('p_appointment', { title: 'ADD slots' });
// });
// router.post('/save', function(req, res, next) {
//     books.push({...req.body,_id:`00${books.length+1}`})
//     res.redirect('/')
//   });

// module.exports = router;
//
// {/* <input type="hidden" name="speciality" value="<%= speciality %>">
// <input type="hidden" name="doctor" value="<%= doctor %>"> */}
// <!-- <input type="hidden" name="speciality" value="<%= speciality %>">
// <input type="hidden" name="doctor" value="<%= doctor %>">




// const patientName = req.body.patientName;
// const phoneNumber = req.body.phoneNumber;
// const speciality = req.body.speciality;
// const doctorId = req.body.doctor;
// const timeSlotId = req.body.timeSlot;

// // Replace with your logic to save appointment details
// const appointment = {
//     patientId: generateUniqueId(), // Replace with your logic to generate a unique patientId
//     speciality: speciality,
//     doctorId: doctorId,
//     slotId: timeSlotId,
//     startTime: getTimeSlotById(timeSlotId).startTime,
//     endTime: getTimeSlotById(timeSlotId).endTime,
//     status: 'Pending', // Initial status
// };