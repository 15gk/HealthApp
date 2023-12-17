const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  
  { 
    userId: {
      type: String,
      unique: true,
      required: true,
    },
    
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["patient", "doctor", "admin"],
      required: true,
    },
    fullName: {
      type: String,
    },
    citizenshipNumber: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    doctorId: {
      type:String
    },
    patientId: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);
UserSchema.plugin(passportLocalMongoose);

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
