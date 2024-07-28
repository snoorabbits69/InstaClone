const express=require("express");
const {  CreatePost, DeletePost, LikePost, getPosts } = require("../controllers/PostController");
const router=express.Router();
router.post("/create/:id",CreatePost)
router.delete("/delete/:postid",DeletePost)
router.post("/likes/:postid",LikePost)
router.get("/getPosts/:id",getPosts)

module.exports=router;