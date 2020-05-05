const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    userName:{
        type:String,
        required:true

    },
    userType:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true

        },
   
  date:{
      type:Date,
      default:Date.now
  }
});

module.exports = mongoose.model('admin', adminSchema);