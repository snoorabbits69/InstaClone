const jwt = require("jsonwebtoken");

module.exports.generateToken = (token) => {
    console.log(token);
    // const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '15d' });
    // console.log(token);
    // res.cookie("uid", token);
}
