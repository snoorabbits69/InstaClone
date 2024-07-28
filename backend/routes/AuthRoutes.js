const express = require("express");
const router = express.Router();
const { register,login,Google,Logout, postforgotpassword, getforgotpassword, getresetlink, postresetlink } = require("../controllers/AuthController");

router.post("/register", register);
router.post("/login", login);
router.post("/google",Google);
router.get("/logout",Logout);
router.get("/forgotpassword",getforgotpassword);
router.post("/forgotpassword",postforgotpassword);

router.get("/resetlink/:token",getresetlink);
router.post("/resetlink/:token",postresetlink);

module.exports = router;
