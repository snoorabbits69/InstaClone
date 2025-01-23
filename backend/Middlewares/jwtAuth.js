const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JTOKEN;

module.exports = (req, res, next) => {
  try {
    if(!req.headers.cookie){
      console.log("no cookie")
      return res.status(401).json({ error: "No cookies found" });
    }
    const cookies = req.headers.cookie ?.split(";")
      .reduce((acc, cookie) => {
        const [key, value] = cookie?.trim().split("=");
        acc[key] = value;
        return acc;
      }, {});
req.headers.cookie.split(";").reduce((acc,cookie)=>{
    const [key, value] = cookie.trim().split("=");
    console.log(key,value)
})
    const token = cookies?.uid; 

    
    if (!token) {
      return res.status(401).json({ error: "Token missing or not provided" });
    }

    const verified = jwt.verify(token, JWT_SECRET);

    req.user = verified;

    next();
  } catch (e) {
    console.error("JWT verification error:", e.message);

    if (e.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired" });
    } else if (e.name === "JsonWebTokenError") {
      return res.status(403).json({ error: "Invalid token" });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
};
