require('dotenv').config();

const env = {
  port : process.env.PORT || 3000,
  MONGODB_URI : process.env.MONGODB_URI,
  JWT_ACCESS_SECRET :process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET :process.env.JWT_REFRESH_SECRET,      
}

module.exports = env;