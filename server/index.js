const express = require('express');
const cors = require('cors');
const bcryptjs = require('bcryptjs')
const { default: mongoose } = require('mongoose');
const User = require('./models/Users.jsx');
const ErrorHandler  = require('./utils/erro.jsx');
const jwt = require('jsonwebtoken')
const app = express()
const cookieParser = require('cookie-parser')
const multer =require('multer')
const PORT = 3500;
const firebase = require('firebase-admin');
require('dotenv').config()

const firebaseConfig = {
    // ...
    storageBucket: 'gs://practrest.appspot.com'
  };
firebase.initializeApp(firebaseConfig);

app.use(express.json())
app.use(cookieParser());
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};
app.use(cors(corsOptions))
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
        // console.log('first handler')
        const validPassword = bcryptjs.compareSync(password,validUser.password)
        if(!validPassword) return next(ErrorHandler(401,'Wrong cridentials!'))
        // console.log('second handler')
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
        const {password:pass,...rest} = validUser._doc
        res.cookie('token',token,{httpOnly:true}).status(200).json({rest,token})
    }catch(err){
        console.log('catch')
        next(err)
    }
})



app.post('/profileImage/:id',async(req,res,next)=>{
    const token = req.cookies.token;
    // console.log(req.user)
    // console.log('token: '+token)
    if(!token) return next(ErrorHandler(401,'Unauthorized'));
    
    jwt.verify(token,process.env.JWT_SECRET,((error,user)=>{
        if(error) return next(ErrorHandler(403,'Forbidden'))
        console.log(user)
        req.user = user
    }))
    if(req.user.id != req.params.id) return next(ErrorHandler(401,'You can only update your own account'))
    console.log('tudo certo')
    
    try{
        
        // const currentUserImg = await User.find({_id:req.user.id},{})
        // console.log(currentUserImg[0].photo.photoUrl)
        // if(!(currentUserImg[0].photo.photoUrl === 'https://firebasestorage.googleapis.com/v0/b/practrest.appspot.com/o/profileIMGS%2Fimages.jpg?alt=media&token=1937ce94-8e11-4aab-a4c9-f48798d87071')){
        //     console.log('apagando foto')
        //     await firebase.storage().bucket().file("profileIMGS/"+currentUserImg[0].photo.photoName).delete();
        // }else{
        //     console.log('ué')
        // }
        
        
        const updatedUser = await User.findOneAndUpdate(
            {_id:req.user.id},
            {
                $set:{
                    'photo.photoName':req.body.name,
                    'photo.photoUrl':req.body.imgUrl
                },
            }
            ,{new:true})
        // console.log('updated: '+ updatedUser)
        const {password, ...rest} = updatedUser._doc;
        
        res.status(200).json({rest})
    }catch(err){
        next(err)
    }
})

app.post('/updateUser/:id',async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token) return next(ErrorHandler(401,'Unauthorized'));
    
    jwt.verify(token,process.env.JWT_SECRET,((error,user)=>{
        if(error) return next(ErrorHandler(403,'Forbidden'))
        req.user = user
    }))
    if(req.user.id != req.params.id) return next(ErrorHandler(401,'You can only update your own account'))
    try{
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10)
        }
        console.log("valid"+req.body)
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            }
        },{new:true})
        const {password, ...rest} = updatedUser._doc;

        res.status(200).json({rest})
    }catch(error){
        next(error)
    }
})



app.use((err,req,res,next)=>{
    // console.log(err)
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})