const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')
const  {createProjectController,getMyProjectsController,getProjectByIdController,updateProjectController,deleteProjectController,addMemberController,removeMemberController} = require('../controllers/project.controller')

router.post('/',authMiddleware,createProjectController);

router.get('/',authMiddleware,getMyProjectsController);

router.get('/:id',authMiddleware,getProjectByIdController);

//Update project 
router.patch('/:id',authMiddleware,updateProjectController);

router.delete('/:id',authMiddleware,deleteProjectController);

router.post(
  "/:id/members",authMiddleware,addMemberController
);

router.delete("/:id/members/:userId",authMiddleware,removeMemberController)

module.exports=router;