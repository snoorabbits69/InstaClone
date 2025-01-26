import mongoose from "mongoose"
const chatschema=mongoose.Schema({
    chatName:{type:String,trim:true},
    isGroupChat:{type:Boolean,default:false},
    GroupChatimage:{
        type:String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

    },
    users:[{type:mongoose.Schema.Types.ObjectId,ref:"users"}],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"message"
    },
    groupAdmin:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    
},{
    timestamps:true
})
export default mongoose.model("chat",chatschema)