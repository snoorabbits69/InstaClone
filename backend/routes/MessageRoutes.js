const express=require("express");
const jwtAuth = require("../Middlewares/jwtAuth");

const { GetallMessages, sendMessage, DeleteMessage } = require("../controllers/MessageController");
const router=express.Router();
router.get("/:chatId",jwtAuth,GetallMessages)
router.post("/",jwtAuth,sendMessage)
router.delete("/delete/:msgid",jwtAuth,DeleteMessage)
module.exports=router