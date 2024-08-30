const express = require("express");
const router = express.Router();
const {GetUsers,profile,addfollowers,removefollowers,getUser,getUserfromid, getRecommendation}=require("../controllers/UserController");
const { ReqMiddleWare } = require("../Middlewares/ReqMiddeWare");
const { AcceptMiddleWare } = require("../Middlewares/AcceptMiddleWare");
router.post("/profile/:id",profile)
router.post("/addfollowers/:id",ReqMiddleWare,addfollowers)
router.post("/acceptfollowers/:id",AcceptMiddleWare,addfollowers)
router.post("/removefollowers/:id",removefollowers)
router.get("/search/:id",GetUsers);
router.get("/getuser/:username",getUser);
router.get("/getuserfromid/:id",getUserfromid);
router.get("/getrecommend/:id",getRecommendation);
module.exports = router;
