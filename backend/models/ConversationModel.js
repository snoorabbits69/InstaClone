const { Timestamp } = require("mongodb");
const mongoose=require("mongoose");
const ConvoSchema=mongoose.Schema({
    participants:[
        {
            type:mongoose.mongoose.Schema.Types.ObjectId,
            ref:"users"
        }
    ],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"message",
        default:[],
    }]
},{timestamps:"true"})
module.exports=mongoose.model("Conversation",ConvoSchema);