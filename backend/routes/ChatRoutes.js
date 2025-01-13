const express=require("express");
const jwtAuth = require("../Middlewares/jwtAuth");
const router=express.Router();
const {accessChat,fetchChat,createGroupChat,renameGroup,addtoGroup,removeFromGroup, withname}=require("../controllers/ChatController")
router.post("/",jwtAuth,accessChat);

router.get("/",jwtAuth,fetchChat);
router.post("/creategroup",jwtAuth,createGroupChat);
router.post("/rename",jwtAuth,renameGroup);
router.post("/addtogroup",jwtAuth,addtoGroup);
router.post("/removegroup",jwtAuth,removeFromGroup)


module.exports=router