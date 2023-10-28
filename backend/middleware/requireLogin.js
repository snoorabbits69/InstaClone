
const jwt=require("jsonwebtoken");
const validateToken=async(req,res,next)=>{
    try{
    let token;
    let authHeader=req.headers.Authorization||req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
token=authHeader.split(" ")[1];
jwt.verify(token,process.env.JTOKEN,(err,decoded)=>{
    if(err){
        res.status(401);
        throw new Error("User is not authorized");
    }
 req.user=decoded.user;
 next();
})
if(!token){
    res.status(401);
    throw new Error("User aint authorize or token is missing")
}
    }
}
catch(e){
    return res.status(500).json({msg:"internal server error"})
}
}
module.exports=validateToken;