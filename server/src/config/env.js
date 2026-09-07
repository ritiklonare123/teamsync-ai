require('dotenv').config();

const env = {
  port : process.env.PORT || 3000,
  MONGODB_URI : process.env.MONGODB_URI,
  JWT_SECRET : process.env.JWT_SECRET,
}

module.exports = env;