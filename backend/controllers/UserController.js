const User = require("../models/userModel");
const admin=require("firebase-admin");
const serviceAccount = require("../Serviceaccount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket:process.env.bucket_URL
});

const bucket=admin.storage().bucket();
const multer = require("multer");

// Multer storage configuration
const multerStorage = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  }
});

module.exports.profile = async(req, res, next) => {
  const checkuser=await User.findById(req.params.id);
  multerStorage.single('file')(req, res, async(err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
const fileUpload=await bucket.file(req.file.fieldname+"_"+Date.now()+"_"+req.file.originalname);
try{
const blobstream=await fileUpload.createWriteStream().end(req.file.buffer);
}

catch(e){
  return res.json({error:e,status:false})
}
checkuser.avatar=`https://firebasestorage.googleapis.com/v0/b/${process.env.storageBucket}/o/${fileUpload.name}?alt=media`;
const {Password,...rest}=checkuser.toObject()
return res.json({status:true,user:rest})
  });
};

module.exports.addfollowers = async (req, res, next) => {
  if(req.params.id==req.body.id){
    return res.json({ status: false, error: "Can't follow yourself" });
  }
  try {
    const followedUser = await User.findById(req.params.id);
    const followingUser = await User.findById(req.body.id);

    if (!followedUser || !followingUser) {
      return res.json({ status: false, error: "User not found" });
    }
    const alreadyFollowing = followedUser.followersname.some(follower => follower.id === followingUser._id.toString());
    if (alreadyFollowing) {
      return res.json({ status: false, error: "Already following this user" });
    }

    followedUser.followersname.push({
      id: followingUser._id.toString(),
      Username: followingUser.Username,
      Fullname: followingUser.Fullname,
      avatar: followingUser.avatarImage
    });
    followedUser.followercount += 1;

    followingUser.followingname.push({
      id: followedUser._id.toString(),
      Username: followedUser.Username,
      Fullname: followedUser.Fullname,
      avatar: followedUser.avatarImage
    });
    followingUser.followingcount += 1;

    await followedUser.save();
    await followingUser.save();
const {Password,...rest}=followedUser._doc;
    return res.json({ status: true,user:rest });
  } catch (error) {
    return res.json({ status: false, error: error.message });
  }
};
module.exports.removefollowers = async (req, res, next) => {
  if(req.params.id==req.body.id){
    return res.json({ status: false, error: "Invalid call" });
  }
  try {
    const followedUser = await User.findById(req.params.id);
    const followingUser = await User.findById(req.body.id);

    if (!followedUser || !followingUser) {
      return res.json({ status: false, error: "User not found" });
    }

followedUser.followersname=followedUser.followersname.filter((follower)=>{
  if(follower.id!=followingUser._id){
    return follower;
  }
});
followedUser.followercount-=1;
followedUser.followingname=followingUser.followingname=followedUser.followersname.filter((following)=>{
  if(following.id!=followedUser._id){
    return following;
  }
});
followingUser.followingcount-=1;
await followedUser.save();
await followingUser.save();
const {Password,...rest}=followedUser._doc;
    return res.json({ status: true,user:rest });
  } catch (error) {
    return res.json({ status: false, error: error.message });
  }
};

module.exports.GetUsers=async(req,res,next)=>{
try{
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