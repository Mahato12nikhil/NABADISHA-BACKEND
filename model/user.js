const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name:{
    required:true,
    type:String
  } ,
  email:{
    required:true,
    type:String,
    unique:true
  } ,
  password:{
    required:true,
    type:String
  },
  phone:{
    required:true,
    type:String
  },
  userType:{
    required:true,
    type:String,
    default:"user"
  },
  image:{
    required:true,
    type:String
  },
  date:{
    type:Date,
    default:Date.now
  }  
  
});

const User=mongoose.model('User',userSchema);

module.exports=User
