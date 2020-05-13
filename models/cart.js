const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const odaSchema = new Schema({
    items:{
        type:Object,
        require:true
    },
    user:String,
    length:Number,
    overAllPrice:{
        type:Number,
        required:true

    },
    totalQty:{
        type:Number,
        required:true

    },
    
   
  date:{
      type:Date,
      default:Date.now
  }
});

module.exports = mongoose.model('oda', odaSchema);