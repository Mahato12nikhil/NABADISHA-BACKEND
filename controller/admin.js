const { validationResult } = require('express-validator');
const User=require('../model/user')
const Gallery=require('../model/gallery')
const Activity=require('../model/activity')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')


exports.login=(req,res,next)=>{

    const errors=validationResult(req)
    
    //validating errors
    if(!errors.isEmpty()){
      return  res.status(400).json({errors:errors.array(), success:false})
    }
    const {email,password}=req.body;
    let loadedUser;

    User.findOne({email:email})
        .then(user=>{
            //If user not exist
            if(!user){
               
               return res.status(401).json({error:"Invalid username/ password", success:false});
            }
           
            else{
                loadedUser=user;
                //compare password
              
                return bcryptjs.compare(password,user.password);    ;         
            }
            
        })
        .then(isEqual=>{
            //if wrong password
            if(!isEqual){
               return res.status(404).json({error:"Invalid username/ password", success:false});
            }

            //create token and authorize logging
            if(loadedUser.userType!=='admin'){
                return res.status(403).json({message:'User is not admin',success:false})
            }
            const token=jwt.sign({
                email:email,
                userId:loadedUser._id
                
            },
            'XOUTYHUIIOMHGH8790987',
            {expiresIn:'7h'}
            );
            success=true
          return  res.status(200).json({token:token,message:"login successful",success});
      
        })
        .catch(err=>{
            console.log('I knw its not'+err)
         // return res.json({error:err,success:false});
         // next(err)
        })

}

exports.uploadGallery=(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return  res.status(400).json({errors:errors.array(), success:false})
      }
    const {title,description,image}=req.body;
   console.log(req.userId)
    Gallery.create({
        user:req.userId,
        title:title,
        description:description,
        image:image
    })
    .then(result=>{
        res.status(200).json({success:true,message:"upload successful",data:result})
    })
}


exports.AddActivity=(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return  res.status(400).json({errors:errors.array(), success:false})
      }
    const {title,description,image}=req.body;
   console.log(req.userId)
    Activity.create({
        user:req.userId,
        title:title,
        description:description,
        image:image
    })
    .then(result=>{
        res.status(200).json({success:true,message:"upload successful",data:result})
    })
}
