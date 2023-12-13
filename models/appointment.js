const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const   appointmentSchema = new Schema({
    patientName: {
        type: String,
        required: true
    },
    // phoneNumber: {
    //     type: String,
    //     required: true
    // },
    speciality: {
        type: String,
        required: true
    },
    doctorId: {
        type: String,
        required: true
    },
    // timeSlotId: {
    //     type: String,
    //     required: true
    // },
    // You can add more fields as needed
});

// Create a model from the schema
const Appointment = mongoose.model('appointment', appointmentSchema);

module.exports = Appointment;

