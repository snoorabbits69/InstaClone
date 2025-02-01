import Saved from "../models/SaveModel.js";
import Post from "../models/PostModel.js"

export const SavePost = async (req, res, next) => {
    try {
        const { postid } = req.body;
       
        if (!postid) {
            return res.status(400).json({ status: false, error: "There is no post ID" });
        }

        const post = await Post.findById(postid);

        if (!post) {
            return res.status(404).json({ status: false, error: "Post not found" });
        }

        const saved = await Saved.create({
            userId: req.user._id,  
            savedPost: post._id  
        });

        return res.status(201).json({ status: true, saved });

    } catch (e) {
        console.error("Error in SavePost:", e);
        return res.status(500).json({ status: false, error: "Internal Server Error" });
    }
};

export const unSavepost=async(req,res,next)=>{
    try{
     const {savedid}=req.body;
     const savedPost=await Saved.findById(savedid)
     if(savedPost.userId!=req.user._id){
        return res.json({status:false,error:"you are not allowed"})
     }
      await savedPost.deleteOne();
      return res.json({status:false,data:"deletion sucess"})
    }catch(e){
        return res.json({status:false,error:e})

    }
}
export const GetUserSavedPost=async(req,res,next)=>{
    try{
const savedposts=await Saved.find({userId:req.user._id}).populate({
    path:'savedPost',
    populate:{
        path: 'postedBy',
        select: 'Username avatarImage _id Fullname',
    }

}).select("_id savedposts")
return res.json({status:true,posts:savedposts})


    }
    catch(e){
        return res.json({status:false,error:e})

    }
}

