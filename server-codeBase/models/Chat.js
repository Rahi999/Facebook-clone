const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    message: { type: String, required: true },
  });
  
  const chatModel = mongoose.model('Message', chatSchema);

 module.exports = {chatModel, chatSchema}