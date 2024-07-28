const express = require("express");
const router = express.Router();
const {GetUsers,profile,addfollowers,removefollowers,getUser,getUserfromid}=require("../controllers/UserController");
router.post("/profile/:id",profile)
router.post("/addfollowers/:id",addfollowers)
router.post("/removefollowers/:id",removefollowers)
router.get("/search/:id",GetUsers);
router.get("/getuser/:username",getUser);
router.get("/getuserfromid/:id",getUserfromid);
module.exports = router;
