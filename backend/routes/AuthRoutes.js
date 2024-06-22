const express = require("express");
const router = express.Router();
const { register,login,Google,Logout } = require("../controllers/AuthController");

router.post("/register", register);
router.post("/login", login);
router.post("/google",Google);
router.get("/logout",Logout);
module.exports = router;
