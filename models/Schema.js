const mongoose = require('mongoose');

// Define a schema for doctor appointments
const appointmentSchema = new mongoose.Schema({
    patientName: {
      type: String,
      required: true,
    },
    doctorName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  });


// Create a Mongoose model using the schema
const Appointment = mongoose.model('Appointment', appointmentSchema);

// Define a schema for token slips
const tokenSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment', // Reference to the appointment model
    required: true,
  },
  tokenNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String
  },
  estimatedWaitTime: {
    type: Number, // You can use the appropriate data type (e.g., Number, Date, etc.)
  },
  
});

// Create a Mongoose model for token slips using the schema
const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;


const availableSlotsSchema = new mongoose.Schema({
  date: Date,
  timeSlots: [Date],
});

const AvailableSlots = mongoose.model('AvailableSlots', availableSlotsSchema);