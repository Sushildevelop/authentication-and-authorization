const jwt=require('jsonwebtoken')
require('dotenv').config()
const protect=(req,res,next)=>{
    let authHeader=req.headers.authorization
   console.log("middleware call ----------------------------------");
   
    

    if(!authHeader ){
        
        return res.status(401).json({message:"No token,authorizatio denied"})
    }
    
    const token = req.headers.authorization.replace(/^Bearer\s+/, "");
 
    console.log(token);
    

    // if(authHeader.startsWith('Bearer')){
    //     token=authHeader.substring(6)
    // }

    try {
        const decoded=jwt.verify(token,process.env.JWT)
        
        req.user=decoded

             
        // req.user
        next()
        
    } catch (err) {
        res.status(401).json({message:"Token is not valid"})
        
    }
}
  module.exports={protect}
  