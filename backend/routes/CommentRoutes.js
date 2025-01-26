import express from "express";
import {setComment,DeleteComment, Reply, getComment} from '../controllers/CommentController.js';
import jwtAuth from "../Middlewares/jwtAuth.js";

const router=express.Router();
router.post("/comment/:postid",jwtAuth,setComment);
router.post("/reply/:parentid",jwtAuth,Reply);
router.delete("/deletecomment/:commentId",jwtAuth,DeleteComment);
router.get("/comment/get/:postId",getComment);
// router.get("/comment/getReplies/:parentid",getReplyComment);
export default router;
