const Project = require("../models/Project");

const createProject = async (projectData, userId)=>{

  const project = await  Project.create({
        name : projectData.name,
        description : projectData.description,
        owner : userId
  })
  return project;
}

const getMyProjects = async (userId)=>{
   const projects = await Project.find({owner : userId});
       return projects;
}

const getProjectById  = async (projectId, userId)=>{
const project = await Project.findOne
({_id : projectId , owner : userId});
return project;
}

const updateProject = async(projectId,name ,description,userId)=>{
 const project = await Project.findByIdAndUpdate({_id : projectId, owner : userId},{name :name ,description : description});
 return project;
}

module.exports = {createProject,getMyProjects,getProjectById,updateProject};