const {userModel, UserSchema} = require("../models/userAuth")

const Follow = async (req, res) => {
    try{
        
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = {Follow}