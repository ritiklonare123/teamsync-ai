
const getAdminDashboard = (req,res)=>{
       res.status(200).json({
        message : "Welcome Admin"
       })
}

module.exports = {getAdminDashboard}