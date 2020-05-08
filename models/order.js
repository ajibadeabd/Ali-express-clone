const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    price:{
        type:String,
        required:true

    },
    productName:{
        type:String,
        required:true

    },
    qty:{
        type:String,
        required:true

    },
    totalPrice:{
        type:String,
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