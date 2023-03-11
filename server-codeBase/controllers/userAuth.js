const {userModel, UserSchema} = require("../models/userAuth")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config()

// Email extions that should include some part of it in user email

const emailEx = ['@gmail.com', '@mailinator.com', '@yahoo.com', '@hotmail.com', '@outlook.com'];


// SignUp (Create new user account)
const SignUp = async (req, res) => {
    // Taking credentials from user
    const {firstname, surename, email, password, mobile, day, month, year, gender } = req.body
    try{
        if(!firstname || !surename || !email || !password || !mobile || !day || !month || !year){
            return res.status(403).json({message: "All fields are required!!!"})
        }
        if(!emailEx.some(emailex => email.includes(emailex) )){
            return res.status(400).json({message: "Invalid email!!"});
        }
        const emailExist = await userModel.findOne({email})
        if(emailExist){
            return res.status(400).json({message: "User already exist!!"})
        }
        else{
            bcrypt.hash(password, parseInt(process.env.HASHING_TIME), async (err, secure_password) => {
                if(err){
                    console.log(err)
                }else{
                    const user = new userModel({...req.body, password: secure_password})
                    await user.save();
                    const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY)
                    return res.status(200).json({message: "Account created successfully!!!",userId: user._id,
                     firstname: user.firstname, profile_pic: user.profile_pic, cover_pic: user.cover_pic
                     ,token: token})
                }
            })
        }

    }
    catch(error){
        res.send({message:`Catch("Something went wrong", ${error})`})
    }
}

// Login
const Login = async (req, res) => {
    // Taking credentials from user
    const {email, password} = req.body
    try{
        // Check if user provided emaill && password else send warning message
        if(!email || !password){
            return res.status(403).json({message: "Invalid credentials!!"})
        }
        // get user from DB
        const findUser = await userModel.findOne({email})
        if(!findUser){
            return res.status(400).json({message:"User not registered!!"})
        }
       if(findUser && bcrypt.compareSync(password, findUser.password)){
        const token = jwt.sign({userId: findUser._id}, process.env.SECRET_KEY)
        return res.status(200).json({message:"Login Successful",username:findUser.firstname,surename:findUser.surename,
            token:token,userId:findUser._id,profile_pic:findUser.profile_pic,cover_pic:findUser.cover_pic})
       }
        return res.status(400).json({message:"Invalid credentials!!"})
    }
    catch (error){
        res.send({message: `✖ ${error}`})
    }
}

// Edit user's personal profile (only if user is editing his own profile)

const editUser = async (req, res) => {
    // taking credentials from user
    const payload = req.body;
    const ID = req.params.id;
    // finding the user with same id and credentials
    const user = await userModel.find({"_id":ID});
    const userId_in_DB = user.userId;
    const userId_making_request = req.body.userId
    try{
        // checking if user is trying to edit his own profile
        if(userId_in_DB != userId_making_request){
            res.send({message: "You're not authorized"})
        }else {
            await userModel.findByIdAndUpdate({"_id":ID}, payload);
            res.send({message: "User's details updated successfully!!!"})
        }
    }
    catch(err){
        console.log(err)
    }
}
// get all signed users from admin side
const getUsers = async (req,res) => {
    try{
        const allUsers = await userModel.find({})
        res.send(allUsers)
    }
    catch (error){
        res.send("✖ Something went wrong!!")
    }
}
//  Delete user from admin side
const deleteUser = async (req, res) => {
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
}
module.exports = {SignUp, Login, getUsers, editUser, deleteUser}