const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
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
    avatarImage: {
        type: String,
    },
    Username: {
        type: String
    },
    replies: [{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Comment"
    }]
}, { timestamps: true });

CommentSchema.pre("find",(next)=>{
this.populate({path:"replies",
    populate:{path:"userId"}
})
next();
})
module.exports = mongoose.model("Comment", CommentSchema);
