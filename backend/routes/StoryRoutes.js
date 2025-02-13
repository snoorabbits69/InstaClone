import express from "express"
import { uploadStory,deleteStory, getStories, getStoriesbyId } from "../controllers/StoryController.js";
import jwtAuth from "../Middlewares/jwtAuth.js";

const Router=express.Router();
Router.post("/upload",jwtAuth,uploadStory)
Router.delete("/delete/:storyid",jwtAuth,deleteStory)
Router.get("/getstories",jwtAuth,getStories)
Router.get("/getstoriesbyid/:id",jwtAuth,getStoriesbyId)

export default Router;