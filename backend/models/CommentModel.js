const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    
    userId: {
        type:String,
       
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
        required:true
    },
    Username: {
        type: String,
        required:true
    },
    replies: [{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Comment"
    }]
}, { timestamps: true });

CommentSchema.pre("find",(next)=>{
    try{
this.populate({path:"replies",
    populate:{path:"userId"}
})
next();
    }
    catch(e){
       next();
    }
})
module.exports = mongoose.model("Comment", CommentSchema);
