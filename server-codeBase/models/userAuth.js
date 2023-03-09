const mongoose = require("mongoose")
const UserSchema = mongoose.Schema({
    firstname: {type:String, required:true},
    surename: {type:String, required:true},
    profile_pic: {type:String, required:true, default:""},
    cover_pic: {type:String, default:""},
    mobile: {type:Number},
    email: {type:String, required:true},
    password: {type:String, required:true},
    day: {type:Number, required:true},
    month: {type:Number, requiredL:true},
    year: {type:Number, required:true},
    gender: {type:String, default:"male"},
    following: [{type:mongoose.Schema.Types.ObjectId, ref:'user'}],
    followers: [{type:mongoose.Schema.Types.ObjectId, ref: 'user'}],
    createdAt: {type: Date, default:Date.now}
})

const userModel = mongoose.model('user', UserSchema)
module.exports = {userModel, UserSchema}