const express = require("express")
const {authMiddleware} = require("../middlewares/userAuth")
const {sendMessages, getMessgaes} = require("../controllers/Chat")
const chatRouter = express.Router()

chatRouter.post("/send-messages", authMiddleware, sendMessages)
chatRouter.get("/get-messages", authMiddleware, getMessgaes)

module.exports = {chatRouter}