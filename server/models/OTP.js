const mongoose = require("mongoose");
const { Schema } = mongoose;

const OTPSchema = new Schema(
  {
    email: {type: String, unique: true},
    otp: String,
    createdAt: Date,
    expiresAt: Date, 
  },
  { timestamps: true }
);

const OTPModel = mongoose.model("OTP", OTPSchema);

module.exports = OTPModel;
