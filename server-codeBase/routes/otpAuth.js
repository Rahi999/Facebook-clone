const express = require('express');
const {sendOTP} = require("../controllers/otpAuth");
const otpRouter = express.Router()

otpRouter.post('/send-otp', sendOTP);

module.exports = {otpRouter}