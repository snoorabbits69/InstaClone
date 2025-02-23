
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
import { generateToken } from "../utils/GenerateJwt.js";
import nodemailer from "nodemailer";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const updatetoken = process.env.Updatetoken;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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



export const getforgotpassword = (req, res, next) => {
  try {
    res.render(path.join(__dirname, '../file/ForgetPassword.ejs'));
  } catch (e) {
    return res.json({ status: false, error: e.message });
  }
};

export const postforgotpassword = async (req, res, next) => {
  try {
    console.log(req.body);

    // Check if the user exists
    const findUser = await User.findOne({ Email: req.body.Email });
    console.log(findUser)
    if (!findUser) {
      return res.status(400).json({ status: false, error: "User doesn't exist" });
    }

    // Generate JWT token with expiration of 15 minutes
    const token = jwt.sign(
      { Username: findUser.Username, Email: findUser.Email },
      process.env.UPDATETOKEN, 
      { expiresIn: "15m" }
    );

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.Email, // Your email
        pass: process.env.PASS,  // Your email password or app password
      },
    });

    // Define the email options
    const mailOptions = {
      from: process.env.Email,   //=
      to: req.body.Email,        // Recipient email
      subject: 'Password Reset Request',
      text: `Hello, please use the following link to reset your password: http://localhost:3000/api/auth/resetlink/${token}`,
    };

    // Send the email
    const result = await transporter.sendMail(mailOptions);
    
    // Send success response
    return res.json({ status: true, message: "Reset link sent to your email" });

  } catch (e) {
    console.error(e);
    // Return a structured error response
    return res.status(500).json({ status: false, error: "Something went wrong. Please try again later." });
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