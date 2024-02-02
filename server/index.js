const express = require('express');
const cors = require('cors')
const app = express()
const PORT = 3500;

app.use(cors())
app.use(express.json())

app.listen(PORT,()=>{
    console.log(`the server is running on port ${PORT}`)
})



app.get('/',(req,res)=>{
    res.json({message:'everything is okay'})
})
app.post('/',(req,res)=>{
    
})