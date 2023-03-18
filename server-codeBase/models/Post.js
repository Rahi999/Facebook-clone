const mongoose = require("mongoose")
const {ObjectId } = mongoose.Schema;

const postSchema = mongoose.Schema({
    type: {type: String,  default:null},
    text: {type: String},
    images : [
        {type: String}
    ],
    user: {type: ObjectId, ref: "user", required: true},
    background: {type: String},
    comments: [
        {comment: {type: String},
         images: {type: String},
         commentsBy : {type: ObjectId, ref: "user"},
         commentAt: {type: Date, requried: true}
    }]
}, {timeStamp: true})

const PostModel = mongoose.model("Post", postSchema);
module.exports = {PostModel}