import mongoose from "mongoose";
const dbConnect=async()=>{
    try{
const connect=await mongoose.connect(process.env.MONGO_URL,{dbName:"InstaClone"},{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
console.log("connection sucessfull",connect.connection.host,connect.connection.name)
    }
    catch(e){
console.log(e)
    }
}
export default dbConnect