const express=require("express");
const {  CreatePost, DeletePost, LikePost, getPosts, GetPostFromId } = require("../controllers/PostController");
const router=express.Router();
const jwtAuth=require("../Middlewares/jwtAuth")

router.post("/create",jwtAuth,CreatePost) //need to change to jwt
router.delete("/delete/:postid",jwtAuth,DeletePost)
router.post("/likes/:postid",jwtAuth,LikePost)
router.get("/getPosts/:id",getPosts)
router.get("/getPost/:id",GetPostFromId);

module.exports=router;