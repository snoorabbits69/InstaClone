const User = require("../models/UserModel");
const {bucket} =require("../firebase/firebase")
const {upload}=require("../Multer/multer");
const sharp=require("sharp");
module.exports.profile = async(req, res, next) => {
  const checkuser=await User.findById(req.params.id);
  upload.single('file')(req, res, async(err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const optimizedbuffer=await sharp(req.file.buffer).resize(350,350,{fit:"contain"}).flatten({ background: { r: 0, g: 0, b: 0,alpha:0 } }).webp().toBuffer();
    const filename=checkuser.Username+"profile_"+Date.now()+"_.webp";
    const fileUpload=await bucket.file("UserProfile/"+filename);
    try{
     
     
const blobstream=await fileUpload.createWriteStream().end(optimizedbuffer);

  const delfile=checkuser.avatarImage;
  if(delfile.slice(8).startsWith(`firebasestorage.googleapis.com/v0/b/${process.env.storageBucket}`)){
    const deletedfile=delfile.slice(delfile.lastIndexOf("/"),delfile.lastIndexOf("?")).slice(15);
await bucket.file("UserProfile/"+deletedfile).delete();
console.log(true);
  }

}

catch(e){
  return res.json({error:e,status:false})
}
checkuser.avatarImage=`https://firebasestorage.googleapis.com/v0/b/${process.env.storageBucket}/o/UserProfile%2F${filename}?alt=media`;
await checkuser.save();
console.log(checkuser);
const {Password,...rest}=checkuser.toObject()
return res.json({status:true,user:rest})
  });
};

module.exports.addfollowers = async (req, res, next) => {
  if (req.params.id === req.body.id) {
    return res.json({ status: false, error: "Can't follow yourself" });
  }

  try {
    const followedUser = await User.findById(req.params.id);
    const followingUser = await User.findById(req.body.id);

    if (!followedUser || !followingUser) {
      return res.json({ status: false, error: "User not found" });
    }

    const alreadyFollowing = followedUser.followersname.some(follower => follower.id === followingUser._id.toString());
    followedUser.followersname.forEach((data)=>{console.log(data)});
    if (alreadyFollowing) {
      return res.json({ status: false, error: "Already following this user" });
    }

    followedUser.followersname.push({ id: followingUser._id.toString() });
    followedUser.followercount += 1;

    followingUser.followingname.push({ id: followedUser._id.toString() });
    followingUser.followingcount += 1;

    await Promise.all([followedUser.save(), followingUser.save()]);

    const { Password, ...rest } = followedUser._doc;
    return res.json({ status: true, user: rest });
  } catch (error) {
    return res.json({ status: false, error: error.message });
  }
};

module.exports.removefollowers = async (req, res, next) => {
  if (req.params.id === req.body.id) {
    return res.json({ status: false, error: "Invalid call" });
  }

  try {
    const followedUser = await User.findById(req.params.id);
    const followingUser = await User.findById(req.body.id);

    if (!followedUser || !followingUser) {
      return res.json({ status: false, error: "User not found" });
    }

    followedUser.followersname = followedUser.followersname.filter(follower => follower.id !== followingUser._id.toString());
    followedUser.followercount -= 1;

    followingUser.followingname = followingUser.followingname.filter(following => following.id !== followedUser._id.toString());
    followingUser.followingcount -= 1;

    await Promise.all([followedUser.save(), followingUser.save()]);

    const { Password, ...rest } = followedUser._doc;
    return res.json({ status: true, user: rest });
  } catch (error) {
    return res.json({ status: false, error: error.message });
  }
};

module.exports.GetUsers=async(req,res,next)=>{
try{
  console.log(req.cookies);
    const finduser=await User.find({Username:{ $regex: `^${req.params.id}`}}); 
    return res.status(200).json({status:true,user:finduser});
}
catch(e){
    console.error(e);
    return res.json({status:false,error:e})
}
}
module.exports.getUser = async (req, res, next) => {
  console.log(req.params.username);
  try {
    const username = req.params.username; 
    const user = await User.findOne({ Username: username });

    if (!user) {
      return res.status(404).json({ status: false, error: "User doesn't exist" });
    }

    return res.status(200).json({ status: true, user: user });
  } catch (error) {
    return res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};
module.exports.getUserfromid=async(req,res,next)=>{
  try{
    const user=await User.findById(req.params.id);
    const { Password, ...rest } = user._doc;

    if(!user){
      return res.json({ status: false, error: "User not found" });
}
    return res.json({status:true,user:rest});

  }
  catch(e){
    return res.json({status:false,error:e});

  }
}
module.exports.getRecommendation = async (req, res, next) => {
  const limit = 5;
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided

  const start =(page-1)*limit;

  try {
    const currentUser = await User.findById(req.params.id);

    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }
const alreadyFollowing=currentUser.followingname.map((user)=>{
  return user.id;
})
alreadyFollowing.push(currentUser._id)
    const recommend = await User.find({ _id: { $nin:alreadyFollowing  } })
      .skip(start)
      .limit(limit);

    return res.json({ Users: recommend });
  } catch (e) {
    console.error(e); // Log error for debugging
    return res.status(500).json({ error: 'An error occurred while fetching recommendations' });
  }
};
