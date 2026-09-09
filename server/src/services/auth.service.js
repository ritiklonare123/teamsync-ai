
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {generateAccessToken,generateRefreshToken} = require('./token.service');
// const env = require('../config/env.js')

const registerUser = async (userData)=>{

  const existingUser = await User.findOne({email : userData.email})
       if(existingUser){
        throw new Error("Email  already registered")
       }
 
const hashedPassword = await bcrypt.hash(userData.password,10);
 
 const user  = await User.create({
         name : userData.name,
         email : userData.email,
         password : hashedPassword
})

return {
  id : user._id,
  name : user.name,
  email : user.email,
}

}

const loginUser = async (email,password)=>{

 const user = await User.findOne({email});
  if(!user){
    throw new Error("Invalid email or password")
  }
  const isPasswordMatch = await bcrypt.compare(password,user.password);

  if(!isPasswordMatch){
    throw new Error("Invalid email or password")
  }

  // const token = jwt.sign({id : user._id,role : user.role},process.env.JWT_SECRET,{expiresIn : "7d"})

  const accessToken  =   generateAccessToken(user);
  const refreshToken  =  generateRefreshToken(user);
  console.log(accessToken);
  return {
    accessToken,
    refreshToken, 
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
    
}

module.exports = {registerUser,loginUser}