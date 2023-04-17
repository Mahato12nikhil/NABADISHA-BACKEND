const { validationResult } = require('express-validator');
const User=require('../model/user')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')


exports.signup=(req,res,next)=>{
    const errors=validationResult(req)
    //console.log(errors)
    if(!errors.isEmpty()){
        
       return res.status(400).json({errors:errors.array(), success:false})
    }
    const {email,password,phone,name,image,confirmpassword}=req.body;


    User.findOne({email:email})
        .then(user=>{
            if(user){
                res.status(403).json({error:'User already exist', success:false});
            }
            else{
                bcryptjs.hash(password,12)
                .then(hashedpwd=>{
                  User.create({

                      name: name,
                      email: email,
                      password: hashedpwd,
                      phone:phone,
                      image:image,
                     
                
                    }).then(user => {
                      const token=jwt.sign({
                          email:email,
                          name:name
                      },
                      'somesecretKey',
                      {expiresIn:'10h'}
                      );
                      res.status(200).json({token:token,userId:user._id,success:true  })

                       
                    });
                }).catch(err=>{
                    res.status(500).json({error:'Server error',success:false})
                })
            }
        })

    
} 

exports.login=(req,res,next)=>{

    const errors=validationResult(req)
    
    //validating errors
    if(!errors.isEmpty()){
      return  res.status(400).json({errors:errors.array, success:false})
    }
    const {email,password,phone,name,image}=req.body;


    User.findOne({email:email})
        .then(user=>{
            //If user not exist
            if(!user){
               
               return res.status(401).json({error:"User doesn't exist", success:false});
            }
           
            else{
                loadedUser=user;
                //compare password
                return bcryptjs.compare(password,user.password);         
            }
            
        })
        .then(isEqual=>{
            //if wrong password
            if(!isEqual){
               return res.status(404).json({error:"Wrong password", success:false});
            }

            //create token and authorize logging
            const token=jwt.sign({
                email:email,
                userId:loadedUser._id.toString()
            },
            'somesecretKey',
            {expiresIn:'1h'}
            );
            success=true
          return  res.status(200).json({token:token,message:"login successful",success});
      
        })
        .catch(err=>{
            console.log('I knw its not')
         // return res.json({error:err,success:false});
         // next(err)
        })

}