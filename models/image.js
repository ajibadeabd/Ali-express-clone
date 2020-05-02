const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    id:{
        type:String,
        required:true,
    },
    url:{
        type:String
    },
   
   
  date:{
      type:Date,
      default:Date.now
  }
});

module.exports = mongoose.model('image', imageSchema);