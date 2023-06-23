const express = require("express")
const {authMiddleware} = require("../middlewares/userAuth")
const {sendMessage, getMessages} = require("../controllers/Chat")
const chatRouter = express.Router()

chatRouter.post("/send-messages", authMiddleware, sendMessage)
chatRouter.get("/get-messages/:senderId/:receiverId", authMiddleware, getMessages)

module.exports = {chatRouter}