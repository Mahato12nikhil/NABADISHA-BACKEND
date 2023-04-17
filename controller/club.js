const Gallery=require('../model/gallery')
const User=require('../model/user')
const Activity=require('../model/activity')

exports.getAbout=(req,res)=>{
    About.find()
         .then(about=>{
            if(about){
                console.log(about)
                res.status(200).json(about)
            }
              
         })
}
exports.getGallery=(req,res)=>{
    Gallery.find()
         .then(gallery=>{
            if(gallery){
              //  console.log({success:true,data:gallery})
                res.status(200).json({success:true,data:gallery})
            }
              
         })
}
exports.getMembers=(req,res)=>{
   // const userType=req.user
    User.find({userType:'user'})
         .then(user=>{
            if(user){
                console.log(user)
                res.status(200).json({data:user,size:Object.keys(user).length,success:true})
            }
              
         })
}
exports.getActivity=(req,res)=>{
    //const userType=req.user
     Activity.find()
          .then(result=>{
             if(result){
                 console.log(result)
                 res.status(200).json(result)
             }
               
          })
          .catch(err=>{
            
          })
 }


