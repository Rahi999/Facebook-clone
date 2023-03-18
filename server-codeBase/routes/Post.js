const express = require("express");
const {authMiddleware} = require("../middlewares/userAuth")
const {createPost, getAllPosts, addComment} = require("../controllers/Post")
const postRouter = express.Router()

postRouter.get("/get", authMiddleware, getAllPosts)
postRouter.post("/create", createPost)
postRouter.put("/comment", authMiddleware, addComment)

module.exports = {postRouter}