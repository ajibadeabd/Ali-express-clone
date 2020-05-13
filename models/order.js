const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    price:{
        type:Number,
        required:true

    },
    productName:{
        type:String,
        required:true

    },
    id:{
        type:String,
        required:true

    },
    qty:{
        type:Number,
        required:true

    },
    totalPrice:{
        type:Number,
        required:true

    },
    image:{
        type:String,
        required:true

    },
   owner:{
        type:String,
        required:true
    },
    
   
  date:{
      type:Date,
      default:Date.now
  }
});

module.exports = mongoose.model('order', orderSchema);