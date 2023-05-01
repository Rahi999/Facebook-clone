const express = require("express");
const {authMiddleware} = require("../middlewares/userAuth")
const {createStory, getAllStories} = require("../controllers/Story")
const storyRouter = express.Router()

storyRouter.get("/getAll", authMiddleware, getAllStories)
storyRouter.post("/create", authMiddleware, createStory)
module.exports = {storyRouter}