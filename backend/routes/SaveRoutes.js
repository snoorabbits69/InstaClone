import { SavePost, unSavepost } from "../controllers/SaveController.js";
import Router from "express"
import jwtAuth from "../Middlewares/jwtAuth.js";

let router=Router();
router.post("/save",jwtAuth,SavePost)
router.post("/unsave",jwtAuth,unSavepost)
export default router;