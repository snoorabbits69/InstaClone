import admin from "firebase-admin";
import { config } from "dotenv";
import path from "path";
import ServiceAccount from "../Serviceaccount.json" assert {type:"json"}
config({path:path.join(process.cwd(),".",".env")});
admin.initializeApp({
  credential: admin.credential.cert(ServiceAccount),
  storageBucket: process.env.bucket_URL 
});

export const bucket = admin.storage().bucket();
