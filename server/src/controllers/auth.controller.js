
const User = require('../models/User');
const {registerUser,loginUser} = require('../services/auth.service');

const register = async (req,res)=>{
    
   try{
    const user = await registerUser(req.body);
      res.status(201).json({
        message : "User registered successfully",
        user 
      })
   }catch(error){
         res.status(400).json({
          message : error.message
         })
   }
}
const login = async(req,res)=>{
 try{
  const {email , password} = req.body; 
    const {user,token}  = await loginUser(email,password);
    res.status(201).json({
      message : "User Login successfully",
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    })
 }catch(error){
     res.status(401).json({
      message : error.message,
     })
 }
}

const profile = async (req,res)=>{
try{
const user = await User.findById(req.user.id).select("-password");
res.status(200).json({
  user,
});
}catch(error){
  res.status(500).json({
    message: error.message,
  });
}
}
module.exports = {register,login,profile}