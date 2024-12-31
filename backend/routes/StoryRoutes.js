const express=require("express");
const { uploadStory,deleteStory } = require("../controllers/StoryController");
const jwtAuth=require("../Middlewares/jwtAuth")
const Router=express.Router();
Router.post("/upload/:postedBy",jwtAuth,uploadStory)
Router.delete("/delete/:storyid",jwtAuth,deleteStory)
module.exports=Router;