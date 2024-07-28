const admin=require("firebase-admin");
const serviceAccount = require("../Serviceaccount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket:process.env.bucket_URL
});

const bucket=admin.storage().bucket();
module.exports={bucket}