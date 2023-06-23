const { chatModel } = require("../models/Chat")

const sendMessage = async (req, res) => {
    try {
        const { senderId, receiverId, message } = req.body;
        const newMessage = new chatModel({ senderId, receiverId, message });

        newMessage.save((err) => {
            if (err) {
                console.error(err);
                return res.status(500).json(err.message);
            } else {
                res.status(201).send('Message sent!!');
            }
        });
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}

const getMessages = async (req, res) => {
    try {
        const { senderId, receiverId } = req.query;
        const userId = req.userId;

        chatModel.find(
            {
                $or: [
                    { senderId, receiverId, $or: [{ senderId: userId }, { receiverId: userId }] },
                    { senderId: receiverId, receiverId: senderId, $or: [{ senderId: userId }, { receiverId: userId }] },
                ],
            },
            (err, messages) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json(err.message);
                } else {
                    res.status(200).send(messages);
                }
            }
        );
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {sendMessage, getMessages}