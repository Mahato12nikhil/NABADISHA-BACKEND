const mongoose = require('mongoose');
const { Schema } = mongoose;

const activitySchema = new Schema({
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

const Activity=mongoose.model('activity',activitySchema);

module.exports=Activity
