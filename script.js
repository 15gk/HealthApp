const mongoose = require('mongoose');
const Doctor = require('./models/doctors');

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost/doctor-appointment');

// Define an array of doctor names
const doctorNames = ['Dr. Ram', 'Dr.Hari', 'Dr.Shyam', 'Dr.Govinda'];

// Wait for the database connection to open
mongoose.connection.once('open', async () => {
  try {
    // Add doctors to the database
    for (const name of doctorNames) {
      const doctor = new Doctor({ name });
      await doctor.save();
    }
    console.log('Doctors added successfully.');

    // Disconnect from the database when done
    mongoose.connection.close();
  } catch (error) {
    console.error('Error adding doctors:', error);

    // Disconnect from the database in case of an error
    mongoose.connection.close();
  }
});

// Handle MongoDB connection errors
mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});
