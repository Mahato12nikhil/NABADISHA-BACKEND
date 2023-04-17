const jwt=require('jsonwebtoken')

const validateUser=(req,res,next)=>{
    const token=req.header('Authorization')

    if(!token){
      return  res.status(401).json("Please use a valid token.");
    }
    try{
        const data=jwt.verify(token,'XOUTYHUIIOMHGH8790987');
        req.userId=data.userId;
        next()
    }
    catch(err){
        res.status(401).json("Please use a valid token."+err);
    }
    
}
module.exports=validateUser