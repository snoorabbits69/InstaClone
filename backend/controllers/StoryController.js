 import Story from "../models/StoryModel.js";
 import User from "../models/UserModel.js"
 import {upload} from "../Multer/multer.js";
 import {bucket} from "../firebase/firebase.js"
 import sharp from "sharp"
export const uploadStory = async (req, res, next) => {
    const expirationTime = new Date(new Date().getTime() + 60 * 60 * 1000);  // Adds 1 hour
    upload.single('file')(req, res, async (err) => {
        if (err) {
            return res.json({ error: "Error uploading file" });
        }

        try {
            const optimizedFile = await sharp(req.file.buffer)
                .resize(400, 800, { fit: 'cover' })
                .webp()
                .toBuffer();
            
            const originalName = req.file.originalname.substring(0, req.file.originalname.lastIndexOf("."));
            const filename = Date.now() + originalName + ".webp";

            const file = bucket.file("stories/" + filename);
            await file.createWriteStream().end(optimizedFile);

            const newStory = await Story.create({
                postedBy: req.user._id,
                image: `https://firebasestorage.googleapis.com/v0/b/${process.env.storageBucket}/o/stories%2F${filename}?alt=media`,
                expiresAt: expirationTime
            });
         await newStory.save()
        

            return res.json({status:true, story: newStory });
        } catch (e) {
            return res.json({ error: e.message });
        }
    });
}

const DeleteFile = async (filename) => {
setTimeout(async () => {
        try {
            await bucket.file("stories/" + filename).delete();
            console.log("Deletion Success");
        } catch (e) {
            console.log("Error deleting file:", e);
        }
    }, 60*60*1000);
}

export const deleteStory = async (req, res) => {
    try {
      const storyId = req.params.storyid;
      const storyToDelete = await Story.findById(storyId);
  
      if (storyToDelete) {
        const imageUrl = storyToDelete.image.substring(storyToDelete.image.lastIndexOf("/") + 11, storyToDelete.image.lastIndexOf("?"));
  
      
         await storyToDelete.deleteOne(),
          await bucket.file(imageUrl).delete()

  
        return res.json({story:true, msg: "Deletion successful" });
      } else {
        return res.status(404).json({ error: "Story not found" });
      }
    } catch (e) {
      return res.status(500).json({ error: "An error occurred during deletion" });
    }
  };
  
  export const getStories=async(req,res,next)=>{
   try{
let user=await User.findById(req.user._id)
const ids = user?.followingname.map(item => item.id);
ids.push(req.user._id)
let stories = await Story.find({ postedBy: { $in: ids } })
  .populate("postedBy", "Username Fullname avatarImage _id")
  .lean();

  let results = stories.reduce((acc, story) => {
    let user = acc.find(item => item.postedBy.toString() === story.postedBy.toString());
    if (user) {
      user.stories.push(story._id);
    } else {
      acc.push({
        postedBy: story.postedBy,
        stories: [story._id]
      });
    }
    return acc;
  }, []);
  results.sort((a, b) => (a.postedBy._id.toString() === req.user._id.toString() ? -1 : 1));
return res.json({status:true,stories:results})

   }catch(e){
    return res.json({status:false,error:e})
   }
  }

  export const getStoriesbyUser=async(req,res,next)=>{
    
    try{
  const story=await Story.find({postedBy:req.params.userid})
  if(!story){
    return res.json({status:false,error:"Story doesnt exist"})
  }
  return res.json({status:true,story:story})
    }catch(e){
    return res.json({status:false,error:e})
   }
  }

  export const getStoriesbyId=async(req,res,next)=>{
    try{
        console.log(req.params.id)
  const story=await Story.findById(req.params.id)
  const stories=await Story.find({postedBy:story.postedBy})
  console.log(stories,"Stories")
  if(!story){
    return res.json({status:false,error:"Story doesnt exist"})
  }
  return res.json({status:true,story:stories})
    }catch(e){
    return res.json({status:false,error:e})
   }
  }