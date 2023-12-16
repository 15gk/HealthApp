// // const mongoose = require("mongoose");

// // mongoose.connect("mongodb://127.0.0.1/books");

// // const db = mongoose.connection;
// // // console.log('123123')
// // db.on("error", (err) => console.log("MongoDB error occured:", err));
// // db.once("open", () => {
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const port = 8080;
// mongoose
//   .connect(
//     "mongodb+srv://gautamkriti89:RNUstW0WLxk3HoH0@cluster0.5ubb3l8.mongodb.net/?retryWrites=true&w=majority",
//     { useNewUrlParser: true, useUnifiedTopology: true }
//   )

//   .then(() => console.log("Connected Successfully"))

//   .catch((err) => {
//     console.error(err);
//   });

// //create a server object:
// app.listen(port, () => {
//   console.log("starting the server");
// });