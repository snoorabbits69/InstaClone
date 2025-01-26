import express from "express"
import jwtAuth from "../Middlewares/jwtAuth.js";

import  { GetallMessages, sendMessage, DeleteMessage }  from "../controllers/MessageController.js";
const router=express.Router();
router.get("/:chatId",jwtAuth,GetallMessages)
router.post("/",jwtAuth,sendMessage)
router.delete("/delete/:msgid",jwtAuth,DeleteMessage)

export default router;