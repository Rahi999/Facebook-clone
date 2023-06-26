const express = require('express');
const {sendSMS} = require("../controllers/otpAuth");
const otpRouter = express.Router()

otpRouter.post('/send-otp', sendSMS);

module.exports = {otpRouter}