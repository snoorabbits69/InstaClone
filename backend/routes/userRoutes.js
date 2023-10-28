const express = require("express");
const router = express.Router();
const { register,login,Profile } = require("../controllers/UserControllers");

router.post("/register", register);
router.post("/login", login);
router.post("/profile",Profile);
module.exports = router;
