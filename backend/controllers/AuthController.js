
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require('path');
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
    const token = jwt.sign(rest, JWT_SECRET);
    res.cookie("uid", token, { httpOnly: true, secure: true })

    return res.status(200).json({ status: true, user: rest });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal server error", status: false });
  }
};

module.exports.login = async (req, res, next) => {
  try {
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
    const token = jwt.sign(rest, JWT_SECRET);

    res.cookie("uid", token, { httpOnly: true, secure: true })

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
      const token = jwt.sign(rest, JWT_SECRET);
      console.log(token);
      res.cookie("uid", token, { httpOnly: true, secure: true })
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
      const token = jwt.sign(rest, JWT_SECRET);
      res.cookie("uid", token, { httpOnly: true, secure: true })
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