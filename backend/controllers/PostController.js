
import User from "../models/UserModel.js"
import Post from "../models/PostModel.js";
import sharp from "sharp";
import { upload } from "../Multer/multer.js";
import { bucket } from "../firebase/firebase.js";
export const CreatePost = async (req, res, next) => {

    const findUser = await User.findById(req.user._id);
    if (!findUser) {
      return res.status(500).json({ msg: "User doesn't exist" });
    }
try{
    upload.array('files', 5)(req, res, async (err) => {
      console.log(req.files)
      if (err) {
        return res.status(500).json({ msg: "Error on file upload" });
      }

      const fileLinks = [];
   if(req.files){
      const uploadPromises = req.files.map(async (file) => {
        const filename = `${findUser.Username}post_${Date.now()}.webp`;
        const fileUpload = bucket.file(`Posts/${filename}`);
        let newimgbuffer= await sharp(file.buffer)
        .resize(400, 800,{fit:'cover'}).webp().toBuffer();
        return new Promise((resolve, reject) => {
          const blobStream = fileUpload.createWriteStream();

          blobStream.on('error', (err) => {
            reject(err);
          });

          blobStream.on('finish', () => {
            const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${process.env.storageBucket}/o/Posts%2F${filename}?alt=media`;
            fileLinks.push(fileUrl);
            resolve();
          });
          blobStream.end(newimgbuffer);
        });
      });

        await Promise.all(uploadPromises);
        const newPost = await Post.create({

          postedBy: req.user._id,
          caption: req.body.caption,
          img: fileLinks,
        });
        findUser.Posts+=1;
        await findUser.save();
        return res.status(200).json({ Post: newPost,status:true });
      }
      else{
        return res.status(500).json({msg:"No files found"});
      }
  })
 }
  catch (e) {
    return res.status(500).json({ error: e });
  }
};

export const DeletePost = async (req, res, next) => {
  try {
    const Post_Del = await Post.findById(req.params.postid);

    if (!Post_Del) {
      return res.status(404).json({ error: "Post not found" });
    }

    const deletePromises = Post_Del.img.map(async (image) => {
      let filename = image.substring(image.lastIndexOf("/") + 9, image.lastIndexOf("?"));
      return bucket.file("Posts/" + filename).delete();
    });

    await Promise.all(deletePromises);
    const DelUser = await User.findById(Post_Del.postedBy);

    if (!DelUser) {
      return res.status(404).json({ error: "User not found" });
    }

    
    User.Posts = Math.max(0, User.Posts - 1); 
  await DelUser.save();
  await Post.findByIdAndDelete(req.params.postid);

    return res.json({ user: DelUser, msg: "deletion success" });
  } catch (e) {
    console.error(e); 
    return res.status(500).json({ error: "An error occurred during the deletion process" });
  }
};

export const LikePost=async(req,res,next)=>{
  const Currentpost=await Post.findById(req.params.postid);
  try{
  if(!Currentpost){
    return res.json({msg:"Post doesnt exist"});
  }
  if(Currentpost.likes.some((id)=>id==req.user._id)){
   Currentpost.likes=Currentpost.likes.filter((id)=>{
    if(id!=req.user._id){
      return id;
    }
   })
   await Currentpost.save();
  }
  else{
  Currentpost.likes.push(req.user._id);
  await Currentpost.save();
  }
  return res.json({likes:Currentpost});
}
catch(e){
  return res.json({error:e});

}
  }


export const getPosts=async(req,res,next)=>{
  try{
    const finduser=await User.findById(req.params.id);
    if(!finduser){
      return res.json({msg:"User doesnt exist"});
    }
    const Allposts=await Post.find({postedBy:req.params.id});
    if(!Allposts){
      return res.json({msg:"No Post found"});
    }
    return res.json({posts:Allposts,status:true})
  }
  catch(e){
    return res.json({error:e});
  }
  }
  export const GetPostFromId=async(req,res,next)=>{
    try{
const findpost=await Post.findById(req.params.id).populate("postedBy","Username Fullname avatarImage _id")
if(!findpost){
return res.json({msg:"post doesnt exist"})
}
return res.json({post:findpost})


    }
    catch(e){
return res.json({error:e})
    }
  }
  
  export const getHomePosts=async(req,res,next)=>{
    try{
      let limit=5;
      let page=req.query.page ||1;
      let end=limit*page;
      let start=end-limit;
      const Posts = await Post.find({postedBy:{$ne:req.user._id}}).limit(limit).skip(start).populate("postedBy","Username Fullname avatarImage")
   
return res.json({Posts:Posts,status:true})
    }
    catch(e){
return res.json({error:e})
    }
  }