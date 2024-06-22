const { Timestamp } = require("mongodb");
const mongoose=require("mongoose");
const messageschema=mongoose.Schema({
    SenderId:{
type:mongoose.Schema.Types.ObjectId,
ref:"users"
    },
    RecieverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"

    },
    message:{
type:String,
required:true
    },
   
}, {
    timestamps:true
})
module.exports=mongoose.model("message",messageschema)