const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/books");

const db = mongoose.connection;
// console.log('123123')
db.on("error", (err) => console.log("MongoDB error occured:", err));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
