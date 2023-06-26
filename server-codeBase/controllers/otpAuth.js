const twilio = require('twilio');
const otpModel = require('../models/otpAuth');

// Twilio client setup
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Generate a random OTP
function generateOTP() {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < 6; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

// Save the OTP to the user's document in MongoDB
async function saveOTPToDB(phoneNumber, otp) {
  try {
    const user = await otpModel.findOne({ phoneNumber });
    if (user) {
      user.otp = otp;
      await user.save();
    } else {
      await otpModel.create({ phoneNumber, otp });
    }
  } catch (error) {
    console.error('Error saving OTP to DB:', error);
    throw new Error('An error occurred while saving OTP to DB');
  }
}

// Send OTP via Twilio
async function sendOTP(req, res) {
  try {
    const { phoneNumber } = req.body;
    const otp = generateOTP();

    // Save the OTP to the user's document in MongoDB
    await saveOTPToDB(phoneNumber, otp);

    // Send the OTP via Twilio
    await twilioClient.messages.create({
      body: `Your verification OTP is ${otp}`,
      from: '8084216452',
      to: phoneNumber,
    });

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'An error occurred while sending the OTP' });
  }
}

module.exports = {
  sendOTP,
};