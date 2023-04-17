const mongoose = require('mongoose');
const { Schema } = mongoose;

const gallerySchema = new Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  title:{
    required:true,
    type:String
  } ,
  description:{
    required:true,
    type:String,
  } ,
  image:{
    required:true,
    type:String
  },
  date:{
    type:Date,
    default:Date.now
  }  
  
});

const Gallery=mongoose.model('gallery',gallerySchema);

module.exports=Gallery
