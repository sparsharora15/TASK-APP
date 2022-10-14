const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
        
    },
    password: {
        required: true,
        type: String
        
    },
    jwtToken:{
        type:String
    }
})
const Users = mongoose.model("Users",userSchema)
module.exports = Users