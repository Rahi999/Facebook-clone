const express = require("express")
const {SignUp, Login} = require("../controllers/userAuth")
const userRouter = express.Router()
const {userModel, UserSchema} = require("../models/userAuth")

userRouter.get("/", async (req,res) => {
    try{
        const allUsers = await userModel.find({})
        res.send(allUsers)
    }
    catch (error){
        res.send("✖ Something went wrong!!")
    }
})
userRouter.post("/signup", SignUp)
userRouter.post("/signin", Login)
userRouter.delete("/delete/:id", async (req, res) => {
    const ID = req.params.id;
    const user = await userModel.find({"_id":ID});
    try{
        if(!user){
            res.send("User not found with this id")
        } else{
            await userModel.findOneAndDelete({"_id":ID});
            res.send("User deleted")
        }

    }
    catch(error){
        console.log(error)
    }
})

module.exports = userRouter