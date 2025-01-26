import express from "express"
import { uploadStory,deleteStory } from "../controllers/StoryController.js";
import jwtAuth from "../Middlewares/jwtAuth.js";

const Router=express.Router();
Router.post("/upload/:postedBy",jwtAuth,uploadStory)
Router.delete("/delete/:storyid",jwtAuth,deleteStory)

export default Router;