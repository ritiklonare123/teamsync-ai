
const express = require('express');
const router =  express.Router();
 const authController = require('../controllers/auth.controller'); 
 const {validateRegister} = require('../middlewares/validate.middleware');
router.post('/register',validateRegister,authController.register)

module.exports = router;