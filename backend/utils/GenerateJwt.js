const jwt = require("jsonwebtoken");
const JWT_SECRET=process.env.JTOKEN;
module.exports.generateToken = (payload,res) => {
   
   console.log(payload);
    try{
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '15d' });
    console.log(token);
    res.cookie("uid", token, { httpOnly: true, secure: true,sameSite: 'None'});
    }
    catch(e){
        console.log(e);
    }
}
