const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')
const  {createProjectController,getMyProjectsController,getProjectByIdController,updateProjectController} = require('../controllers/project.controller')

router.post('/',authMiddleware,createProjectController);

router.get('/',authMiddleware,getMyProjectsController);

router.get('/:id',authMiddleware,getProjectByIdController);

//Update project 
router.patch('/:id',authMiddleware,updateProjectController);

module.exports=router;