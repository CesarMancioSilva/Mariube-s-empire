const mongoose = require('mongoose')

// const UserImgSchema = new mongoose.Schema({
   
// })

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
        photoName:{
            type:String,
            default:'imageDefault'
        },
        photoUrl:{
            type:String,
            data:Buffer,
            default:'https://firebasestorage.googleapis.com/v0/b/practrest.appspot.com/o/profileIMGS%2Fimages.jpg?alt=media&token=1937ce94-8e11-4aab-a4c9-f48798d87071'
        }
    },
    // photoURL:{
    //     type:String,
    //     data:Buffer,
    //     default:'https://firebasestorage.googleapis.com/v0/b/practrest.appspot.com/o/profileIMGS%2Fimages.jpg?alt=media&token=0cd2fd44-1116-4b72-bedc-5e53548614db'
    // },
    admin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const User = mongoose.model('user',UserSchema)
module.exports = User