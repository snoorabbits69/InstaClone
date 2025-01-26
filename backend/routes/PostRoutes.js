import express from "express"
import {  CreatePost, DeletePost, LikePost, getPosts, GetPostFromId, getHomePosts } from "../controllers/PostController.js";
import jwtAuth from "../Middlewares/jwtAuth.js";

const router=express.Router();

router.post("/create",jwtAuth,CreatePost) //need to change to jwt
router.delete("/delete/:postid",jwtAuth,DeletePost)
router.post("/likes/:postid",jwtAuth,LikePost)
router.get("/getPosts/:id",getPosts)
router.get("/getPost/:id",GetPostFromId);
router.get("/getHomePost",jwtAuth,getHomePosts);
export default router;