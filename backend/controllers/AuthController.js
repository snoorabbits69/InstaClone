
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require('path');
const {generateToken}=require("../utils/GenerateJwt");
const JWT_SECRET = process.env.JTOKEN;
module.exports.register = async (req, res, next) => {
  try {
    const { Fullname, Username, Email, Password } = req.body;
    if (!Fullname || !Username || !Email || !Password) {
      return res.status(400).json({ msg: 'Invalid request data', status: false });
    }
    const userCheck = await User.findOne({ Username });
    const emailCheck = await User.findOne({ Email });

    if (userCheck) {
      return res.status(400).json({ msg: 'User already exists', status: false });
    }

    if (emailCheck) {
      return res.status(400).json({ msg: 'Email in use', status: false });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const createUser = await User.create({
      Fullname,
      Email,
      Username,
      Password: hashedPassword,
    });

    const { Password: _, ...rest } = createUser.toObject();
    generateToken(rest,res);


    return res.status(200).json({ status: true, user: rest });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal server error", status: false });
  }
};

module.exports.login = async (req, res, next) => {
 
  try {
    console.log(req.body)
    const { Username, Password } = req.body;
    const checkUser = await User.findOne({ Username });

    if (!checkUser) {
      return res.status(400).json({ msg: "Incorrect username or password", status: false });
    }

    const checkPassword = await bcrypt.compare(Password, checkUser.Password);
    if (!checkPassword) {
      return res.status(400).json({ msg: "Incorrect password", status: false });
    }

    const { Password: _, ...rest } = checkUser.toObject();
    generateToken(rest,res);


    return res.status(200).json({ status: true, user: rest });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal Server Error", status: false });
  }
};

module.exports.Google = async (req, res, next) => {
  try {
    const { Username, Fullname, avatarImage, Email } = req.body;

    const checkUser = await User.findOne({ Email });

    if (checkUser) {
      const { Password: _, ...rest } = checkUser.toObject();
      generateToken(rest,res);
      return res.status(200).json({ status: true, user: rest });
    } else {
      const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatePassword, 10);

      const createUser = await User.create({
        Username,
        Fullname,
        avatarImage,
        Email,
        Password: hashedPassword,
      });

      const { Password: _, ...rest } = createUser.toObject();
      generateToken(rest,res);

      return res.status(200).json({ status: true, user: rest });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal Server Error", status: false });
  }
};
module.exports.Logout = (req, res,next) => {
	try {
		res.clearCookie("uid");
		return res.status(200).json({status:true, message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
const nodemailer=require("nodemailer");
const updatetoken=process.env.Updatetoken;

module.exports.getforgotpassword=(req,res,next)=>{
try{
res.render(path.join(__dirname,'../file/ForgetPassword.ejs'));
}catch(e){
  return res.json({ status: false, error: e.message });

}
}
module.exports.postforgotpassword = async (req, res, next) => {
  try {
    console.log(req.body)
    const findUser = await User.findOne({ Email: req.body.Email });
    if (!findUser) {
      return res.json({ status: false, msg: "User doesn't exist" });
    }

const token=jwt.sign({Username:findUser.Username,Email:findUser.Email},updatetoken,{expiresIn:"15min"});

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.Email,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.Email,
      to: req.body.Email,
      subject: 'Password Reset Request',
      text: `Hello, please use the following link to reset your password:http://localhost:3000/api/auth/resetlink/${token} `,
    };

    const result = await transporter.sendMail(mailOptions);
    res.send("reset link send to your Email");
    // return res.json({ status: true,msg:"reset link send to your Email" });

  } catch (e) {
    console.error(e);
    res.send("User doesnt exist");

  }
};
module.exports.getresetlink=async(req,res,next)=>{
  try{
    const verify=jwt.verify(req.params.token,updatetoken);
  if(!verify){
    return res.json({status:false,msg:"Invalid"})
  }
  else{
  const {Email}=jwt.decode(req.params.token);
  const resetUser=await User.findOne({Email});
res.render(path.join(__dirname,"../file/ResetPasssword.ejs"),{oldPassword:resetUser.Password});
  }
  }
  catch(e){
res.send("Server Error");
  }
}
module.exports.postresetlink=async(req,res,next)=>{
  try{
    const verify=jwt.verify(req.params.token,updatetoken);
  if(!verify){
    return res.json({status:false,msg:"Invalid"})
  }
  else{
  const {Email}=jwt.decode(req.params.token);
const hashedPassword=await bcrypt.hash(req.body.Password,10);
const update=await User.updateOne({Email},{Password:hashedPassword});
  res.send("changed succesfully");
  }
  // return res.render(path.join(__dirname, '../file/forgotpassword.ejs'));
}catch(e){
  return res.json({status:false,error:e})

}

}