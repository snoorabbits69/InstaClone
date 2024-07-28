const { timeStamp } = require("console");
const mongoose=require("mongoose");
const PostSchema=mongoose.Schema(
    {
postedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true
},
caption:{
    type:String,
    maxlength:500
},
img:{
    type:[String]
},
likes:{
type:[mongoose.Schema.Types.ObjectId],
ref:"users",
default:[]
},
},{timestamps:true})
module.exports=mongoose.model("Post",PostSchema);