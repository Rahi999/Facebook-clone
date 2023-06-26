const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
});

const otpModel = mongoose.model("otp", otpSchema)
module.exports = {otpModel}