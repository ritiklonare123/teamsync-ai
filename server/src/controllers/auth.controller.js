
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const env = require('../config/env')
const {registerUser,loginUser} = require('../services/auth.service');
const {generateAccessToken, generateRefreshToken} = require('../services/token.service') 


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
    const {accessToken,refreshToken,user}  = await loginUser(email,password);
    res.status(201).
    cookie("refreshToken",refreshToken,
      {  httpOnly: true,
      secure: false, // development mode 
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,}).
    json({
      message : "User Login successfully",
      accessToken,
      refreshToken,
      user
    })
 }catch(error){
     res.status(401).json({
      message : error.message,
     })
 }
}

const refresh = async (req,res)=>{
   try{
    const refreshToken = req.cookies.refreshToken;
    // console.log(refreshToken)
    if(!refreshToken){
     return res.status(401).json({
      message :  "Refresh token is required",
     })
    }
    const user = jwt.verify(
      refreshToken,
      env.JWT_REFRESH_SECRET
    );
    if(user.type !== "refresh"){
      return res.status(401).json({message : "Invalid refresh token"})
    }
    const existingUser = await User.findById(user.id);

    if (!existingUser) {
      return res.status(401).json({
        message: "User no longer exists",
      });
    }
    const newAccessToken = generateAccessToken(existingUser);

    res.status(200).json({
      accessToken: newAccessToken,
    });
    
   }catch(error){
      return res.status(401).json({
       message : error.message
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

const logout = (req,res)=>{
      res
      .clearCookie('refreshToken')
      .status(200)
      .json({message : "Logout successful"})
}
module.exports = {register,login,profile, refresh,logout}



