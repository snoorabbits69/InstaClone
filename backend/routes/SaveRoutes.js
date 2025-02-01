import { GetUserSavedPost, SavePost, unSavepost } from "../controllers/SaveController.js";
import Router from "express"
import jwtAuth from "../Middlewares/jwtAuth.js";

let router=Router();
router.post("/post/save",jwtAuth,SavePost)
router.post("/post/unsave",jwtAuth,unSavepost)
router.get("/post/getsavedposts",jwtAuth,GetUserSavedPost)
export default router;