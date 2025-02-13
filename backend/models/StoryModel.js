import mongoose from "mongoose"
const StorySchema=mongoose.Schema({
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
image:{
    type:String,
    required:true
},
expiresAt:{
    type:Date,
    required:true,
    expires:'1h'
},
Likes:[{type:mongoose.Schema.Types.ObjectId,ref:"users"}]

},{
    timestamps:true
})
export default mongoose.model("story",StorySchema);