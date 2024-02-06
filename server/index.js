const express = require('express');
const cors = require('cors');
const bcryptjs = require('bcryptjs')
const { default: mongoose } = require('mongoose');
const User = require('./models/Users.jsx');
const ErrorHandler  = require('./utils/erro.jsx');
const jwt = require('jsonwebtoken')
const app = express()
const PORT = 3500;
require('dotenv').config()
app.use(cors())
app.use(express.json())

app.listen(PORT,()=>{
    console.log(`the server is running on port ${PORT}`)
})

//mongodb+srv://cesarmanciosilva:<password>@cluster0.21dp8ss.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://cesarmanciosilva:mBsWuKT3bjMVwubc@mern-rest-pract.gvhgvkh.mongodb.net/mern-rest-pract?retryWrites=true&w=majority`)
.then(()=>console.log('connected to database'))
.catch(error=>console.log(error))


app.get('/',(req,res)=>{
    res.json({message:`Server is running on port ${PORT}`})
})

app.post('/sign-up',async (req,res,next)=>{
    console.log('sign-up connected')
    const {name,email,password} = req.body
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({name,email,password:hashedPassword})
    try{
        await newUser.save()
        console.log("created",newUser)
        res.status(201).json(newUser)
    }catch(err){
        console.log(err)
        next(err)
    }
})

app.post('/login',async(req,res,next)=>{
    const {email,password} = req.body
    // console.log(process.env)
    try{
        const validUser = await User.findOne({email})
        if(!validUser) return next(ErrorHandler(404,'User not found!'));
        console.log('first handler')
        const validPassword = bcryptjs.compareSync(password,validUser.password)
        if(!validPassword) return next(ErrorHandler(401,'Wrong cridentials!'))
        console.log('second handler')
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
        const {password:pass,...rest} = validUser._doc
        res.cookie('acces_token',token,{httpOnly:true}).status(200).json({rest})
    }catch(err){
        console.log('catch')
        next(err)
    }
})




app.use((err,req,res,next)=>{
    console.log(err)
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})