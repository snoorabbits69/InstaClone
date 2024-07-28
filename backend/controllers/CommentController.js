const Post=require("../models/PostModel");
const Comment=require("../models/CommentModel");
module.exports.Comment=async(req,res,next)=>{
    const findPost=await Post.findById(req.params.postid);
    if(!findPost){
      return res.json({msg:"The post doesnt exist"});
    }
    try{
        const currentcomment=await Comment.create({
          postId:req.params.postid,
          userId:req.body.id,
          text:req.body.text,
          username:req.body.Username,
          avatarImage:req.body.avatarImage
        });
        console.log(currentcomment);
     return res.json({comment:currentcomment});
    }
  
    catch(e){
      return res.json({error:e})
    }
  }
module.exports.DeleteComment=async(req,res,next)=>{
  const findPost=await Post.findById(req.params.postid);
  return res.json({post:findPost});


}