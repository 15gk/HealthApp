const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); // Import the path module

// Connect to MongoDB
 mongoose.connect('mongodb+srv://User:89YnLBCsPRfRiuyN@health.3svixrs.mongodb.net/?retryWrites=true&w=majority');

// Middleware
app.use(bodyParser.json());

// Define the appointment model and schema using Mongoose
const Appointment = mongoose.model('Appointment', {
  patientName: String,
  doctorName: String,
  date: Date,
  isBooked: Boolean,
});

// Serve static files (HTML, CSS, JS, etc.) from the "public" directory
app.use(express.static('public'));

// Route to get a list of doctors (you can customize this part)
app.get('/doctors', async (req, res) => {
  // Query the database to get a list of doctors
  try {
    // Mock list of doctors for this example...you can replace this with MongoDB data)
    const doctors = [
      {
        _id: '1',
        name: 'Dr. John Smith',
        specialty: 'Cardiologist',
        experience: '15 years',
      },
      // Add more doctor data here...
    ];

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving doctors' });
  }
});

// Code to handle the POST request from the form to book an appointment
app.post('/book-appointment', async (req, res) => {
  try {
    const { date, patientName, doctorName } = req.body;

    // Check if the selected time slot is already booked
    const existingAppointment = await Appointment.findOne({
      date: new Date(date),
      isBooked: true,
    });

    if (existingAppointment) {
      return res.status(400).json({ error: 'Time slot is already booked' });
    }

    // Create a new patient appointment
    const patientAppointment = new Appointment({
      patientName,
      doctorName,
      date: new Date(date),
      isBooked: true,
    });

    // Save the patient appointment to the database
    await patientAppointment.save();

    // Respond with a success message
    res.status(200).json({ message: 'Appointment booked successfully' });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ error: 'Error booking appointment' });
  }
});

// Route to check available time slots for a specific date
app.get('/available-slots', async (req, res) => {
  try {
    // Parse the date from the query parameters
    const date = new Date(req.query.date);

    // Query the database to get available time slots for the given date
    const availableSlots = await Appointment.find(
      {
        date: { $gte: date, $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000) },
        isBooked: false,
      },
      'date'
    );

    res.json(availableSlots);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving available time slots' });
  }
});

// Route to check booked appointments for a specific date
app.get('/booked-appointments', async (req, res) => {
  try {
    // Parse the date from the query parameters
    const date = new Date(req.query.date);

    // Query the database to get booked appointments for the given date
    const bookedAppointments = await Appointment.find(
      {
        date: { $gte: date, $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000) },
        isBooked: true,
      },
      'date'
    );

    res.json(bookedAppointments);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving booked appointments' });
  }
});

// Define a route for the root ("/") URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define a route to handle requests for favicon.ico
app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // Send an empty response (No Content)
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
