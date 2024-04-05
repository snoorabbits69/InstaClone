const User = require("../models/userModel");
const bcrypt = require("bcrypt");
// const jwt=require("jsonwebtoken");
const multer=require("multer");
const path = require('path');

module.exports.register = async (req, res, next) => {
  try{
   
  const {Fullname, Username, Email, Password } = req.body;

  // Validate and sanitize the input data here

  if (!Username || !Email || !Password) {
    return res.status(400).json({ msg: 'Invalid request data', status: false });
  }

  // Check if a user with the same Username or Email already exists
  const userCheck = await User.findOne({ Username });
  const emailCheck = await User.findOne({ Email });

  if (userCheck) {
    return res.status(400).json({ msg: 'User already exists', status: false });
  }

  if (emailCheck) {
    return res.status(400).json({ msg: 'Email in use', status: false });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(Password, 10);

  // Create a new user
  const createUser = await User.create({
    Fullname,
    Email,
    Username,
    Password: hashedPassword,
  });

  // Remove Password from the response
  delete createUser.Password;

  return res.status(201).json({ status: true, user: createUser });
  }
  catch(e){
    console.log(e);
    return res.json({msg:"Internal server error",status:false})
  }
};

module.exports.login = async (req, res, next) => {
  try {
   
    const { Username, Password } = req.body;
    const checkUser = await User.findOne({ Username });
    if (!checkUser) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }
    
    const checkPassword = await bcrypt.compare(Password, checkUser.Password);
    if (!checkPassword) {
      return res.json({ msg: "Incorrect password", status: false });
    }
else{
    // Remove the password field from the response
    delete checkUser.Password;
  
  
}
return res.json({ status: true, user: checkUser });
  
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal Server Error", status: false });
  }
};
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"public/images");
  },
  filename:(req,file,cb)=>{
    cb(null, file.fieldname + '_' + Date.now() + file.originalname);  }
})
const upload=multer({
  storage:storage
})
module.exports.Profile =(req,res,next)=>{
  try{
  upload.single('file') (req,res,async()=>{
  await User.create( {avatarImage:req.file.filename})
    res.status(200).json({ message: 'File uploaded successfully', status: true });
  })
}
catch(e){
  console.log(e);
}
}
