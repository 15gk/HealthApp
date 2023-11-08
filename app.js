// var createError = require('http-errors')
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;



const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// Connect to MongoDB
mongoose.connect('mongodb://localhost/doctor-appointment');

// Middleware
app.use(bodyParser.json());

// Define the appointment model and schema using Mongoose
const Appointment = mongoose.model('Appointment', {
  patientName: String,
  doctorName: String,
  date: Date,
});

app.use(express.static('public'));


const Doctor = require('./resources/doctors'); // Import the Doctor model
// Routes for managing appointments
app.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving appointments' });
  }
});



//code to handle the POST request from the form
app.post('/book-appointment', async (req, res) => {
  try {
    // Get the selected date and time from the request body
    const { date } = req.body;

// other patient information from the request body
    const { patientName, doctorName } = req.body;

    // Creating  new patient appointment
    const patientAppointment = new Appointment({
      patientName,
      doctorName,
      date,
    });

    // Save the patient appointment to the database
    await patientAppointment.save();

    // Respond with a success message
    res.status(200).json({ message: 'Appointment booked successfully' });
  } catch (error) {
    // Handle errors (e.g., validation or database errors)
    console.error('Error booking appointment:', error);
    res.status(500).json({ error: 'Error booking appointment' });
  }
});


app.delete('/appointments/:id', async (req, res) => {
  const appointmentId = req.params.id;
  try {
    await Appointment.findByIdAndDelete(appointmentId);
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting appointment' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Define a route for the root ("/") URL
app.get('/', (req, res) => {
  res.send('Welcome to the Doctor Appointment System');
});

// Define a route to handle requests for favicon.ico
app.get('/favicon.ico', (req, res) => {
 
  res.status(204).end(); // Send an empty response (No Content)
});




// Route to get available dates and time slots
app.get('/available-dates', async (req, res) => {
  const startDate = new Date(); // Start from today
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + 30); // End date after 30 days

  const availableDates = [];
  const workingHours = { start: 9, end: 17 }; // Office working hours

  for (let currentDate = new Date(startDate); currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
    const dateSlots = [];
    for (let hour = workingHours.start; hour < workingHours.end; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const slotDate = new Date(currentDate);
        slotDate.setHours(hour, minute, 0, 0);
        dateSlots.push(slotDate);
      }
    }
    availableDates.push({ date: currentDate, timeSlots: dateSlots });
  }

  //comapring with database query
  const bookedAppointments = await Appointment.find({ date: { $gte: startDate, $lte: endDate } });

  // Filtering out booked slots
  for (const appointment of bookedAppointments) {
    const { date } = appointment;
    availableDates.forEach((availableDate) => {
      if (availableDate.date.toDateString() === date.toDateString()) {
        availableDate.timeSlots = availableDate.timeSlots.filter(
          (slot) => slot.getTime() !== date.getTime()
        );
      }
    });
  }

  // Saving the available slots to the database
  try {
    for (const slot of availableDates) {
      const availableSlot = new AvailableSlots({
        date: slot.date,
        timeSlots: slot.timeSlots,
      });
      await availableSlot.save();
    }
    res.json(availableDates);
  } catch (error) {
    res.status(500).json({ error: 'Error saving available slots' });
  }
});



app.get('/doctors', async (req, res) => {
  try {
    // Querying the database to get a list of doctors
    const doctors = await Doctor.find({}, 'name'); // from Doctor model that has a 'name' field
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving doctors' });
  }
});
