const express=require("express");
const {Comment,DeleteComment, Reply, getComment, getReplyComment}=require('../controllers/CommentController');
const router=express.Router();
router.post("/comment/:postid",Comment);
router.post("/reply/:parentid",Reply);
router.delete("/deletecomment/:postid",DeleteComment);
router.get("/comment/get/:postId",getComment);
router.get("/comment/getReplies/:parentid",getReplyComment);
module.exports=router;
