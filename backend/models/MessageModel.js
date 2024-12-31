
const mongoose=require("mongoose");
const messageschema=mongoose.Schema({
    Sender:{
type:mongoose.Schema.Types.ObjectId,
ref:"users"
    },
    Reciever:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"

    },
    readBy:{
type:mongoose.Schema.Types.ObjectId,
required:true
    },
   
}, {
    timestamps:true
})
module.exports=mongoose.model("message",messageschema)