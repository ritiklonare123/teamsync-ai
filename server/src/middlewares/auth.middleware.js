
const jwt = require('jsonwebtoken');
const env = require('../config/env')

const authMiddleware = (req,res,next)=>{
   const  authHeader  =  req.headers.authorization;
 console.log(authHeader);
   if(!authHeader){
    return res.status(401).json(
      {
        message: "Authorization token is required",
      }
    )
   }
 const token = authHeader.split(" ")[1];

 if(!token){
  return res.status(401).json({
    
      message: "Token is required",
    
  })
 }

  try{
    const decoded = jwt.verify(token,env.JWT_ACCESS_SECRET);
    if(decoded.type  !== "access"){
      return res.status(401).json({message : "Invalid access token"})
    }
    req.user = decoded;
       next();

  }catch(error){
    return res.status(401).json(
      {
        message: "Invalid or expired token",
      }
    )
  }
} 

module.exports = authMiddleware;