
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const generateAccessToken = (user)=>{
    return jwt.sign(
      {
        id : user._id ,
        role : user.role,
        type: "access"
      }
      ,env.JWT_ACCESS_SECRET,
      {expiresIn : "15m"})
}

const generateRefreshToken = (user)=>{
         return jwt.sign({
          id : user._id,
          role : user.role,
          type: "refresh", 
         },env.JWT_REFRESH_SECRET,
         {expiresIn : "30d"})
}

module.exports = {generateAccessToken,generateRefreshToken}