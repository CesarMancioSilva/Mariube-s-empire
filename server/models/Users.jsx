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
        default:'urlimagedefault...'
    }
},{timestamps:true})

const User = mongoose.model('user',UserSchema)
module.exports = User