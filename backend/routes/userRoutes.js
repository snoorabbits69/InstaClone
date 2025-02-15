import express from "express";
import { Router } from "express";  
import jwtAuth from "../Middlewares/jwtAuth.js";
import { 
  GetUsers, 
  profile, 
  addfollowers, 
  removefollowers, 
  getUser, 
  getUserfromid, 
  getRecommendation, 
  deleteprofile, 
  PrivateAccount, 
  cancelRequest, 
  UpdateUsername, 
  UpdateFullname, 
  UpdatePassword 
} from "../controllers/UserController.js";
import { ReqMiddleWare } from "../Middlewares/ReqMiddeWare.js";
import { AcceptMiddleWare } from "../Middlewares/AcceptMiddleWare.js";
const router=Router();
router.post("/profile/:id",profile)
router.delete("/deleteProfilePic/:id",jwtAuth,deleteprofile) //need to change to jwt
router.post("/addfollowers/:id",jwtAuth,ReqMiddleWare,addfollowers) //need to change with jwt
router.post("/acceptfollowers/:id",jwtAuth,AcceptMiddleWare,addfollowers) // need to change with jwt
router.post("/removefollowers/:id",jwtAuth,removefollowers) //need to change to jwt
router.get("/search/:id",jwtAuth,GetUsers);
router.get("/getuser/:username",getUser);
router.get("/getuserfromid/:id",jwtAuth,getUserfromid);
router.get("/getrecommend/:id",jwtAuth,getRecommendation);
router.post("/cancelrequest/:id",jwtAuth,cancelRequest) //need to change to jwt
router.patch("/privateaccount/:id",jwtAuth,PrivateAccount); //need to change to jwt
router.put("/updateusername",jwtAuth,UpdateUsername)
router.put("/updateFullname",jwtAuth,UpdateFullname)
router.put('/updatePassword',jwtAuth,UpdatePassword)

export default router;
