const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    photoURL:{
        type:String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx4ETXIMlUwZYiZuG1B8eLRTu-oDZmV4lW9tuIe3lmIA&s'
    },
    admin:{
        type:String,
        default:false
    }
},{timestamps:true})

const User = mongoose.model('user',UserSchema)
module.exports = User