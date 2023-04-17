const mongoose = require('mongoose');
const { Schema } = mongoose;

const aboutSchema = new Schema({
  title:{
    required:true,
    type:String
  } ,
  description:{
    required:true,
    type:String,
    unique:true
  } ,
  image:{
    required:true,
    type:String
  }
  
});

const About=mongoose.model('About',aboutSchema);

module.exports=About
