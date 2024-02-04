const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/Users.jsx');
const app = express()
const PORT = 3500;

app.use(cors())
app.use(express.json())

app.listen(PORT,()=>{
    console.log(`the server is running on port ${PORT}`)
})


mongoose.connect(`mongodb+srv://cesarmanciosilva:mBsWuKT3bjMVwubc@practicing-rest.gvhgvkh.mongodb.net/practicing-rest?retryWrites=true&w=majority`)
.then(()=>console.log('connected to database'))
.catch(error=>console.log(error))


app.get('/',(req,res)=>{
    res.json({message:`Server is running on port ${PORT}`})
})

app.post('/sign-up',async (req,res,next)=>{
    const {name,email,password} = req.body
    const newUser = new User({name,email,password})
    try{
        await newUser.save()
        console.log("created",newUser)
        res.status(201).json(newUser)
    }catch(err){
        next(err)
    }
//     await User.create(req.body)
//     .then(user => res.json(user))
//     .catch(err => res.json(err))
})

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})