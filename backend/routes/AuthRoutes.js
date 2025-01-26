import express from "express";
const router = express.Router();
import { register,login,Google,Logout, postforgotpassword, getforgotpassword, getresetlink, postresetlink } from "../controllers/AuthController.js"
import jwtAuth from "../Middlewares/jwtAuth.js";

router.post("/register", register);
router.post("/login", login);
router.post("/google",Google);
router.get("/logout",Logout);
router.get("/forgotpassword",getforgotpassword);
router.post("/forgotpassword",postforgotpassword);

router.get("/resetlink/:token",getresetlink);
router.post("/resetlink/:token",postresetlink);

export default router;
