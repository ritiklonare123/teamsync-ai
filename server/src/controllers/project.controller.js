const { createProject ,getMyProjects,getProjectById,updateProject} = require('../services/project.service');


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
module.exports = {createProjectController,getMyProjectsController,getProjectByIdController,updateProjectController};