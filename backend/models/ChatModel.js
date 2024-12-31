const mongoose=require("mongoose");
const chatschema=mongoose.Schema({
    chatName:{type:String,trim:true},
    isGroupChat:{type:Boolean,default:false},
    users:[{type:mongoose.Schema.Types.ObjectId,ref:"users"}],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"message"
    },
    groupAdmin:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
},{
    timestamps:true
})
module.exports=mongoose.model("chat",chatschema)