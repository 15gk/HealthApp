// appointmentController.js
var express = require('express');
var router = express.Router();
var doctors = require('../resources/doctors');
var users = require('../resources/users');
var slots = require('../resources/slots');
var appointments = require('../resources/appointments');
var appoint=require('../resources/appoint')

// router.get('/allocates', function(req, res, next) {
//     res.render('allocates', { title: 'Slots', doctorList:doctors });
//   });
router.get('/choose-speciality', function (req, res, next) {
    const specialties = new Set();
    doctors.forEach(doctor => specialties.add(doctor.speciality));
    // console.log(Array.from(specialties))
    res.render('speciality', { title: 'Choose Speciality', specialities:Array.from(specialties) });
});

// Choose Doctor
router.post('/choose-doctor', function (req, res, next) {
    console.log(req.body);
    const specialty= req.body.speciality
    filteredDoctors=doctors.filter(doctor => doctor.speciality === specialty);
     console.log(filteredDoctors);
    // const filteredDoctors = doctors.filter(doctor => doctor.speciality === speciality);
    res.render('choose-doc', { title: 'Choose Doctor', doctors:filteredDoctors});
});

// View Slots
router.post('/view-slots', function (req, res, next) {
    console.log(req.body);
    const doctorId1 = req.body.doctor;
    console.log(doctorId1)
    // console.log(slots.doctorId1)
    const filteredSlots = slots.filter(slot => (slot.doctorId === doctorId1 && slot.status === 'available' ));
    console.log(filteredSlots)
    res.render('viewSlots', { title: 'View Slots', slots: filteredSlots});
});

// Personal Information
router.post('/personalInfo', function (req, res, next) {
    console.log(req.body)
    const timeSlot = req.body.timeSlot;
    // console.log
    res.render('personalInfo', { title: 'Personal Information',timeSlot:timeSlot});
});

// Appointment Details
router.post('/appointment-details', function (req, res, next) {
    const patientName = req.body.patientName;
    const phoneNumber = req.body.phoneNumber;
    const speciality = req.body.speciality;
    const doctorId = req.body.doctor;
    const timeSlotId = req.body.timeSlot;

    // Replace with your logic to save appointment details
    const appointment = {
        patientId: generateUniqueId(), // Replace with your logic to generate a unique patientId
        speciality: speciality,
        doctorId: doctorId,
        slotId: timeSlotId,
        startTime: getTimeSlotById(timeSlotId).startTime,
        endTime: getTimeSlotById(timeSlotId).endTime,
        status: 'Pending', // Initial status
    };

    appointments.push(appointment);
    res.render('appointmentDetails', { title: 'Appointment Details', appointment: appointment });
});
router.post('/save', function(req, res, next) {
    appoint.push({...req.body,_id:`00${books.length+1}`})
    res.redirect('/')
  });
// Update Appointment Status
router.post('/update-appointment', function (req, res, next) {
    const appointmentId = req.body.appointmentId;
    const newStatus = req.body.newStatus;

    // Replace with your logic to update appointment status
    const appointmentIndex = appointments.findIndex(appointment => appointment._id === appointmentId);
    if (appointmentIndex !== -1) {
        appointments[appointmentIndex].status = newStatus;
    }

    res.redirect('/appointment-details'); // Redirect to the updated appointment details page
});

// Replace with your logic to generate a unique patientId
function generateUniqueId() {
    // Implement your unique ID generation logic
    return 'patient-' + Math.floor(Math.random() * 1000);
}

// Replace with your logic to get time slot details by ID
function getTimeSlotById(timeSlotId) {
    // Implement your logic to find and return the time slot by ID
    return slots.find(slot => slot._id === timeSlotId);
}

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