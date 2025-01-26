
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
import { generateToken } from "../utils/GenerateJwt.js";
import nodemailer from "nodemailer";
const updatetoken = process.env.Updatetoken;

export const register = async (req, res, next) => {
  try {
    const { Fullname, Username, Email, Password } = req.body;
    if (!Fullname || !Username || !Email || !Password) {
      return res.status(400).json({ error: 'Invalid request data', status: false });
    }
    const userCheck = await User.findOne({ Username });
    const emailCheck = await User.findOne({ Email });

    if (userCheck) {
      return res.status(400).json({ error: 'User already exists', status: false });
    }

    if (emailCheck) {
      return res.status(400).json({ error: 'Email in use', status: false });
    }
if(Password.length<8){
  return res.status(400).json({ error: 'Password needs to be of at least 8 letters', status: false });

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
    return res.status(500).json({ error: "Internal server error", status: false });
  }
};

export const login = async (req, res, next) => {
 console.log(req.body)
  try {
    const { Username, Password } = req.body;
    const checkUser = await User.findOne({ Username });

    if (!checkUser) {
      return res.status(400).json({ error: "Incorrect username or password", status: false });
    }

    const checkPassword = await bcrypt.compare(Password, checkUser.Password);
    if (!checkPassword) {
      return res.status(400).json({ error: "Incorrect password", status: false });
    }

    const { Password: _, ...rest } = checkUser.toObject();
    generateToken(rest,res);


    return res.status(200).json({ status: true, user: rest });
  } catch (e) {
    return res.status(500).json({ error: "Internal Server Error", status: false });
  }
};

export const Google = async (req, res, next) => {
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
    return res.status(500).json({ error: "Internal Server Error", status: false });
  }
};
export const Logout = (req, res,next) => {
	try {
		res.clearCookie("uid");
		return res.status(200).json({status:true, message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};


export const getforgotpassword=(req,res,next)=>{
try{
res.render(path.join(__dirname,'../file/ForgetPassword.ejs'));
}catch(e){
  return res.json({ status: false, error: e.message });

}
}
export const postforgotpassword = async (req, res, next) => {
  try {
    console.log(req.body)
    const findUser = await User.findOne({ Email: req.body.Email });
    if (!findUser) {
      return res.json({ status: false, error: "User doesn't exist" });
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
    // return res.json({ status: true,error:"reset link send to your Email" });

  } catch (e) {
    console.error(e);
    res.send("User doesnt exist");

  }
};
export const getresetlink=async(req,res,next)=>{
  try{
    const verify=jwt.verify(req.params.token,updatetoken);
  if(!verify){
    return res.json({status:false,error:"Invalid"})
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
export const postresetlink=async(req,res,next)=>{
  try{
    const verify=jwt.verify(req.params.token,updatetoken);
  if(!verify){
    return res.json({status:false,error:"Invalid"})
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