const express = require("express");
const router = express.Router();
const jwtAuth=require("../Middlewares/jwtAuth")
const {GetUsers,profile,addfollowers,removefollowers,getUser,getUserfromid, getRecommendation, deleteprofile, PrivateAccount, cancelRequest, UpdateUsername, UpdateFullname, UpdatePassword}=require("../controllers/UserController");
const { ReqMiddleWare } = require("../Middlewares/ReqMiddeWare");
const { AcceptMiddleWare } = require("../Middlewares/AcceptMiddleWare");
router.post("/profile/:id",profile)
router.delete("/deleteProfilePic/:id",jwtAuth,deleteprofile) //need to change to jwt
router.post("/addfollowers/:id",jwtAuth,ReqMiddleWare,addfollowers) //need to change with jwt
router.post("/acceptfollowers/:id",jwtAuth,AcceptMiddleWare,addfollowers) // need to change with jwt
router.post("/removefollowers/:id",jwtAuth,removefollowers) //need to change to jwt
router.get("/search/:id",jwtAuth,GetUsers);
router.get("/getuser/:username",jwtAuth,getUser);
router.get("/getuserfromid/:id",jwtAuth,getUserfromid);
router.get("/getrecommend/:id",jwtAuth,getRecommendation);
router.post("/cancelrequest/:id",jwtAuth,cancelRequest) //need to change to jwt
router.patch("/privateaccount/:id",jwtAuth,PrivateAccount); //need to change to jwt
router.put("/updateusername",jwtAuth,UpdateUsername)
router.put("/updateFullname",jwtAuth,UpdateFullname)
router.put('/updatePassword',jwtAuth,UpdatePassword)
module.exports = router;
