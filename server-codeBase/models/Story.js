const mongoose = require('mongoose')
const StorySchema = mongoose.Schema({
    user: [{type:mongoose.Schema.Types.ObjectId, ref:'user'}],
    storyUrl : {type: String, required: true},
    createdAt : {type: String, required: true}
})
const storyModel = mongoose.model("userstory", StorySchema)
module.exports = {StorySchema, storyModel}