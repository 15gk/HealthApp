var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

flatpickr("#appointment-date-time", {
  enableTime: true, // Enable time selection
  dateFormat: "Y-m-d H:i", // Date and time format
});

// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();
// const app = express();
// const port = process.env.PORT || 3000;

// const corsOptions = {
//     origin: true
// };

// app.get('/', (req, res) => {
//     res.send('API is working!');
// });

// // Database connection
// mongoose.set('useFindAndModify', false); // Use this instead of 'strictQuery'
// const connectedDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('Connected to MongoDB');
//     } catch (err) {
//         console.error('Error connecting to MongoDB');
//     }
// };

// // Middleware usage (call the middleware functions)
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors(corsOptions));

// app.listen(port, () => {
//     connectedDB()
//         .then(() => {
//             console.log('Server is running on port ' + port);
//         })
//         .catch((error) => {
//             console.error('Server failed to start:', error);
//         });
// });
