const Project = require("../models/Project");
const User = require('../models/User');

const createProject = async (projectData, userId)=>{

  const project = await  Project.create({
        name : projectData.name,
        description : projectData.description,
        owner : userId
  })
  return project;
}

const getMyProjects = async (userId)=>{
   const projects = await Project.find({owner : userId}).populate("members","name email");;
       return projects;
}

const getProjectById  = async (projectId, userId)=>{
const project = await Project.findOne
({_id : projectId , owner : userId}).populate("members","name email");;
return project;
}

const updateProject = async(projectId,name ,description,userId)=>{
 const project = await Project.findByIdAndUpdate({_id : projectId, owner : userId},{name :name ,description : description});
 return project;
}
const deleteProject = async (projectId,userId)=>{
 const project = await Project.findByIdAndDelete({_id : projectId, owner : userId});
 return project;
}
const addMember = async (projectId,memberId,ownerId)=>{

   const  project = await Project.findOne({_id : projectId , owner : ownerId}).populate("members","name email");;

   if(!project){
    throw new Error("Project not found or you are not the owner");
   }
   
   const user = await User.findById({_id : memberId});

   if(!user){
    throw new Error("User not found")
   }

   const alreadyMember = project.members.some((member)=>member.toString() === memberId);


  if (alreadyMember) {
    throw new Error("User is already a member");
  }
  project.members.push(memberId);
  await project.save();
  return project;
}

const removeMember = async (projectId,memberId,ownerId)=>{

  const  project = await Project.findOne({_id : projectId , owner : ownerId}).populate("members","name email");;

  if(!project){
   throw new Error("Project not found or you are not the owner");
  }
  
  const isMember = project.members.some(
    (member) => member.toString() === memberId
  );
  
  if(!isMember){
    throw new Error("User is not a member of this project");
  }
  project.members.pull(memberId);
  await project.save();
  return project;
   


}
module.exports = {createProject,getMyProjects,getProjectById,updateProject,deleteProject,addMember,removeMember};