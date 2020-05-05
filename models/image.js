const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    id:{
        type:String,
        required:true,
    },
    url:{
        type:String,
        required:true,

    },
    name:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        // required:true,

    },
    category:{
        type:String,
        // required:true,

    },
    price:{
        type:String,
        // required:true,

    },
   
   
  date:{
      type:Date,
      default:Date.now
  }
});

module.exports = mongoose.model('image', imageSchema);