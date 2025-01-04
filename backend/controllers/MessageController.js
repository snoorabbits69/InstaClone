const Chat=require("../models/ChatModel")
const User=require("../models/UserModel")
const Message=require("../models/MessageModel");
const { upload } = require("../Multer/multer");

module.exports.GetallMessages=async(req,res,next)=>{
try{
  
    const messages=await Message.find({chat:req.params.chatId})
    .populate("Sender","Fullname Username avatarImage")
    .populate("chat");
    return res.json({status:true,messages:messages})
}
catch(e){
    return res.status(500).json({status:false,error:e})
}
}

module.exports.sendMessage=async(req,res,next)=>{

    const {content,chatId}=req.body;
    if (!content || !chatId) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
      }
      try{
        let newmessage={
          Sender:req.user._id,
          content:content,
          chat:chatId
        }
        console.log(newmessage)
let message=await Message.create(newmessage);
message=await message.populate("Sender","Fullname Username avatarImage");
return res.status(200).json({status:true,message:message})
      }catch(e){
        return res.status(500).json({status:false,error:e})
      }
    
}
module.exports.DeleteMessage = async (req, res, next) => {
  if (!req.params.msgid) {
      console.log("Invalid msg id");
      return res.status(400).json({ error: "Message ID is required" });
  }
 
  try {
      let CurrentMessage = await Message.findById(req.params.msgid);

      if (!CurrentMessage) {
          return res.status(404).json({ error: "Message not found" });
      }

      if (CurrentMessage.Sender.toString() !== req.user._id.toString()) {
          return res.status(403).json({ error: "You are not the sender of this message" });
      }

      CurrentMessage.content = "This message has been deleted";
      CurrentMessage.isDeleted = true;

      await CurrentMessage.save();

      return res.json({ status: true, message: CurrentMessage });

  } catch (e) {
      console.error(e);
      return res.status(500).json({ status: false, error: e.message });
  }
};
