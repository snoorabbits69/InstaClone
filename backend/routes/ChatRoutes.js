import express from "express";
import jwtAuth from "../Middlewares/jwtAuth.js";

import {accessChat,fetchChat,createGroupChat,renameGroup,addtoGroup,removeFromGroup} from "../controllers/ChatController.js"
const router=express.Router();
router.post("/",jwtAuth,accessChat);

router.get("/",jwtAuth,fetchChat);
router.post("/creategroup",jwtAuth,createGroupChat);
router.post("/rename",jwtAuth,renameGroup);
router.post("/addtogroup",jwtAuth,addtoGroup);
router.post("/removegroup",jwtAuth,removeFromGroup)


export default router;