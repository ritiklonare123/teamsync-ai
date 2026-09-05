const app = require('./app');
const env = require('./config/env');
const connectDB = require('./config/database');

const startServer = async ()=>{
      await connectDB();
  app.listen(env.port,()=>{
    console.log(`server is running on port ${env.port}`)
 })
}

startServer();
