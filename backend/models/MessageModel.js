
import mongoose from "mongoose"
const messageschema=mongoose.Schema({
    Sender:{
type:mongoose.Schema.Types.ObjectId,
ref:"users"
    },
    content:{
        type:String
    },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "chat" },
    readBy:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
      ],
      default:[],
   isDeleted:{
    type:Boolean,
    default:false
   },
   isFile:{
    type:Boolean,
    default:false
   }
}, {
    timestamps:true
})
export default mongoose.model("message",messageschema)