const mongoose = require("mongoose")

const AuthdemoSchema = mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
})

const authdemoModel = mongoose.model('authDemo', AuthdemoSchema);
module.exports = {AuthdemoSchema, authdemoModel}