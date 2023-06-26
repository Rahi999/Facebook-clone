const express = require('express');
const {sendOTP} = require("../controllers/otpAuth");
const otpRouter = express.Router()

otpRouter.post('/send-otp', otpController.sendOTP);

module.exports = {otpRouter}