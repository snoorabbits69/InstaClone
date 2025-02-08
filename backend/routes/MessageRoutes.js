import express from "express"
import jwtAuth from "../Middlewares/jwtAuth.js";

import  { GetallMessages, sendMessage, DeleteMessage, sendImageMessage }  from "../controllers/MessageController.js";
const router=express.Router();
router.get("/:chatId",jwtAuth,GetallMessages)
router.post("/",jwtAuth,sendMessage)
router.post("/sendimage",jwtAuth,sendImageMessage)
router.delete("/delete/:msgid",jwtAuth,DeleteMessage)

export default router;