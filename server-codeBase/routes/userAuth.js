const express = require("express")
const {SignUp, Login, getUsers, editUser, deleteUser} = require("../controllers/userAuth")
const {getData, postDemoData} = require("../controllers/AuthDemo")
const userRouter = express.Router()

userRouter.get("/", getUsers )
userRouter.post("/signup", SignUp)
userRouter.post("/signin", Login)
userRouter.patch("/editUserProfile/:id", editUser)
userRouter.delete("/delete/:id", deleteUser)
userRouter.get("/getDemoDatas", getData);
userRouter.post("/postDemoDatas", postDemoData);
module.exports = userRouter