const { createProject ,getMyProjects,getProjectById,updateProject,deleteProject,addMember,removeMember} = require('../services/project.service');


const createProjectController = async (req,res)=>{
 const {name , description} = req.body;
  const project = await createProject({ name,description},req.user.id);
  res.status(201).json({
    message: "Project created successfully",
    project,
  });

}


const getMyProjectsController = async (req,res)=>{
      try{
         const projects  = await getMyProjects(req.user.id);
         res.status(200).json({
          message: "All projects",
          projects,
        });

      }catch(error){
        res.status(500).json({
          message : error.message
        })
      }
}
const getProjectByIdController = async (req,res)=>{
try{
 
        const projectId = req.params.id;
        const  userId = req.user.id;
      
      const project = await getProjectById(projectId,userId);
        return res.status(200).json({
          message : "get project",
          project
        });
}catch(error){
       res.status(500).json({
        message : error.message
       });  
}
}

const updateProjectController = async (req,res)=>{
     try{
           const projectId = req.params.id;
           const {name ,description} = req.body;
           const userId = req.user.id;
      const project = await updateProject(projectId,name ,description,userId);
      res.status(200).json({
        message : "Updateded successfull",
        project
      })
   }catch(error){
      res.status(500).json({
        message : error.message
      })
   }
}

const deleteProjectController = async (req,res)=>{
        try{
          const projectId = req.params.id;
          const userId = req.user.id;
          const project = await deleteProject(projectId,userId);
          res.status(200).json({
            message : "Project deleted successfully",
            project 
          })
        }catch(error){
             res.status(404).json({
              message : error.message
             })
        }
}

const addMemberController = async (req,res)=>{
try{
     const projectId = req.params.id;
     const memberId = req.body.userId;
     const ownerId = req.user.id;
     const project  = await addMember(projectId,memberId,ownerId); 
     return res.status(200).json({
      message: "Member added successfully",
      project
    });
}catch(error){
  return res.status(500).json({
    message: error.message
  });
}
}
const removeMemberController = async (req,res)=>{
  
  try{
       const projectId = req.params.id ;
       const userId = req.params.userId;
       const ownerId = req.user.id;

       const project = await removeMember(projectId,userId,ownerId);
       return res.status(200).json({
        message: "Member removed successfully",
        project
      });

  }catch(error){
     res.status(500).json({
      message : error.message
     })
  }

}
module.exports = {createProjectController,getMyProjectsController,getProjectByIdController,updateProjectController,deleteProjectController,addMemberController, removeMemberController};