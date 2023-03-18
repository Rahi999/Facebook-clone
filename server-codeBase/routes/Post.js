const express = require("express");
const {authMiddleware} = require("../middlewares/userAuth")
const {createPost, getAllPosts, addComment} = require("../controllers/Post")
const uploadOptions = require("../middlewares/upload")
const postRouter = express.Router()

postRouter.get("/get", authMiddleware, getAllPosts)
postRouter.post('/create' , authMiddleware , uploadOptions.array('images' ,10)  , createPost);
postRouter.put("/comment", authMiddleware, addComment)

module.exports = {postRouter}