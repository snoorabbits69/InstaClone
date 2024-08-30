const express=require("express");
const { uploadStory,deleteStory } = require("../controllers/StoryController");
const Router=express.Router();
Router.post("/upload/:postedBy",uploadStory)
Router.delete("/delete/:storyid",deleteStory)
module.exports=Router;