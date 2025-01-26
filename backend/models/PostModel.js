import mongoose from "mongoose"
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
likes:[{type:mongoose.Schema.Types.ObjectId,ref:"users"}],
privateAccount:{
    type:Boolean,

}
},{timestamps:true})
// PostSchema.pre("save", async function (next) {
//     const user = await User.findById(this.postedBy);
  
//     this.privateAccount = user.Account.private;
  

//     next();
//   });
export default mongoose.model("Post",PostSchema);