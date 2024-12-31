const jwt = require("jsonwebtoken");
const JWT_SECRET=process.env.JTOKEN;
module.exports.generateToken = (payload,res) => {
       try{
        const{_id,Email,Username}=payload
    const token = jwt.sign({_id,Email,Username}, JWT_SECRET, { expiresIn: '15d' });
   
    res.cookie("uid", token, { httpOnly: true, secure: false,sameSite: "Lax", path: '/',});
    }
    catch(e){
        console.log(e);
    }
}
