const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    preço:{
        type:Number,
        required:true
    },
    photo:{
        photoName:{
            type:String,
            default:'imageDefault',
        },
        photoUrl:{
            type:String,
            data:Buffer,
            default:'https://png.pngtree.com/element_our/20200702/ourmid/pngtree-vector-illustration-knife-and-fork-western-food-plate-image_2283844.jpg'
        }
    },
    category:{
        type:String,
        default:false,
        required:true
    }
})

const Order = mongoose.model('order',OrderSchema)
module.exports = Order