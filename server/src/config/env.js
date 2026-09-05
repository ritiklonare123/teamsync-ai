require('dotenv').config();

const env = {
  port : process.env.PORT || 3000,
  MONGODB_URI : process.env.MONGODB_URI
}

module.exports = env;