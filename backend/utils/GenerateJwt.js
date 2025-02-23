import jwt from 'jsonwebtoken';
import { config } from "dotenv";
import path from 'path';
config({path:path.join(process.cwd(),".",".env")});


const JWT_SECRET = process.env.JTOKEN;

export const generateToken = (payload,res) => {
    try{
     const{_id,Email,Username}=payload
 const token = jwt.sign({_id,Email,Username}, JWT_SECRET, { expiresIn: '15d' });

 res.cookie("uid", token, { httpOnly: true, secure: false,sameSite: "Lax", path: '/',});
 }
 catch(e){
     console.log(e);
 }
}