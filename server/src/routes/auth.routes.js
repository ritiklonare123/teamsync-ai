
const express = require('express');
const router =  express.Router();
 const authController = require('../controllers/auth.controller'); 
 const {validateRegister} = require('../middlewares/validate.middleware');
 const isAdmin = require('../middlewares/role.middleware')
 const authMiddleware = require('../middlewares/auth.middleware');
 const adminController = require('../controllers/admin.controller')


router.post('/register',validateRegister,authController.register);

router.get('/login',authController.login);

router.get('/profile',authMiddleware,authController.profile);

router.get("/admin",authMiddleware,isAdmin,adminController.getAdminDashboard);

router.post("/refresh", authController.refresh);

router.post('/logout',authController.logout)
module.exports = router;

