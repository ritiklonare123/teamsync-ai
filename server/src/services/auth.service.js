
const bcrypt = require('bcrypt');
const User = require('../models/User');

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

module.exports = {registerUser}