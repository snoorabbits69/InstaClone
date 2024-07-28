const express=require("express");
const {Comment,DeleteComment}=require('../controllers/CommentController');
const router=express.Router();
router.get("/comment/:postid",Comment);
router.get("/deletecomment/:postid",DeleteComment);
module.exports=router;
