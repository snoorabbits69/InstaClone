const User=require("../models/UserModel");
 module.exports.checkPost=async(req,res,next)=>{
    try{
        const findpost=await Post.findById(req.params.id);
if(!findpost.private){
    next();
}
else{
    const PostedBy=await User.findById(findpost.PostedBy);
    const following=PostedBy.followingname.some((follower)=>follower.id==req.body.id);
if(following){
    next()
}
else{
    return res.json({msg:"private post"})
}
}
    }
    catch(e){
        return res.json({error:e})
    }
 }