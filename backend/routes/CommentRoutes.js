const express=require("express");
const {Comment,DeleteComment, Reply, getComment, getReplyComment}=require('../controllers/CommentController');
const router=express.Router();
const jwtAuth=require("../Middlewares/jwtAuth")
router.post("/comment/:postid",jwtAuth,Comment);
router.post("/reply/:parentid",jwtAuth,Reply);
router.delete("/deletecomment/:commentId",jwtAuth,DeleteComment);
router.get("/comment/get/:postId",getComment);
// router.get("/comment/getReplies/:parentid",getReplyComment);
module.exports=router;
