

const validateRegister = (req,res,next)=>{
  const {name, email, password } = req.body;

  if(!name || !email || !password){
    return res.status(400).json({message : "Name, email and password are required"})
  } 
    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email",
      });
    }
      // Check password length
  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters",
    });
  }
  next();
}

module.exports = {validateRegister};