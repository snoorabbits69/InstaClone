const jwt=require('jsonwebtoken');
const mongoose=require("mongoose");
const User=require("../models/UserModel");
module.exports=(req,res,next)=>{
const authorization=req.headers;
if(!authorization){
    return res.status(401).json({error:"you must be logged in"})
}
const token = authorization.replace("Bearer ","");
}