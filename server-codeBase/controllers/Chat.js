const { chatModel } = require("../models/Chat")

const sendMessage = async (req, res) => {
    try {
        const { senderId, receiverId, message, date } = req.body;
        const newMessage = new chatModel({ senderId, receiverId, message });
    
        await newMessage.save();
        res.status(201).json({message: 'Message saved successfully'});
      } catch (error) {
        return res.status(500).json(error.message);
    }
}

const getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    const messages = await chatModel.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    // console.log(messages); // Add this line to check the retrieved messages

    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};



module.exports = {sendMessage, getMessages}