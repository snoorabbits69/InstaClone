import mongoose from "mongoose"
const CommentSchema = mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
       
    },
    text: {
        type: String,
        required: true,
    },
    parentComment:{
type:mongoose.Schema.Types.ObjectId,
ref:"Comment",
default:null
    },
    replies: [{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Comment"
    }],
    isDeleted:{
        type:Boolean,
        default:false
    }
}, { timestamps: true });


export default mongoose.model("Comment", CommentSchema);
