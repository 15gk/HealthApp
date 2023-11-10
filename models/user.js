const mongoose = require('mongoose');

// Define a schema for the users
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    doctorId: { type: String },
    patientId: { type: String },
});

// Create a model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
