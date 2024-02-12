const mongoose = require('mongoose')

const UserImgSchema = new mongoose.Schema({
    photoName:{
        type:String,
    },
    photoUrl:{
        type:String,
        data:Buffer,
    }
})

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
    photo:{
        type:[UserImgSchema],
        default:[{
            photoName:'defaultImage',
            photoUrl:'https://firebasestorage.googleapis.com/v0/b/practrest.appspot.com/o/profileIMGS%2Fimages.jpg?alt=media&token=0cd2fd44-1116-4b72-bedc-5e53548614db'
        }]
    },
    // photoURL:{
    //     type:String,
    //     data:Buffer,
    //     default:'https://firebasestorage.googleapis.com/v0/b/practrest.appspot.com/o/profileIMGS%2Fimages.jpg?alt=media&token=0cd2fd44-1116-4b72-bedc-5e53548614db'
    // },
    admin:{
        type:String,
        default:false
    }
},{timestamps:true})

const User = mongoose.model('user',UserSchema)
module.exports = User