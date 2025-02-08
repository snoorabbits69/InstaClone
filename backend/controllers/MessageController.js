import Chat from "../models/ChatModel.js";
import User from "../models/UserModel.js";
import Message from "../models/MessageModel.js";
import { upload } from "../Multer/multer.js";
import { client } from "../config/RedisConnection.js";
import { bucket } from "../firebase/firebase.js";
import sharp from "sharp";

async function invalidateCache(chatId){
  try{
const key=await client.keys( `messages:${chatId}`);
if(key){
  await client.del(key)
}
  }catch(e){
    console.log(e)
  }
}
export const GetallMessages=async(req,res,next)=>{
try{
  
    let cacheKey=`messages:${req.params.chatId}`
 let data
 try{
     data=await client.get(cacheKey);
 }catch(e){
  console.log(e)
 }
    if(data){
      return res.json({status:true,messages: JSON.parse(data)})

    }
    else{
    const messages=await Message.find({chat:req.params.chatId})
    .populate("Sender","Fullname Username avatarImage")
    .populate("chat");
    client.setEx(cacheKey,180,JSON.stringify(messages))
    return res.json({status:true,messages:messages})
    }
}
catch(e){
    return res.status(500).json({status:false,error:e})
}
}
export const sendMessage=async(req,res,next)=>{

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
let message=await Message.create(newmessage);
message=await message.populate("Sender","_id Fullname Username avatarImage");
let chat=await Chat.findById(chatId)
chat.latestMessage=message._id;
await chat.save();
await invalidateCache(chat._id)
return res.status(200).json({status:true,message:message})
      }catch(e){
        return res.status(500).json({status:false,error:e})
      }
    
}

export const sendImageMessage = async (req, res, next) => {
  upload.array('files', 5)(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ msg: "Error on file upload" });
    }

    const { chatId } = req.body;

    if (!chatId) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }

    try {
      const uploadPromises = req.files.map(async (file) => {
        const filename = `${chatId}post_${Date.now()}.webp`;
        const fileUpload = bucket.file(`Messages/${filename}`);
        const newImgBuffer = await sharp(file.buffer)
          .resize(400, 800, { fit: 'cover' })
          .webp()
          .toBuffer();

        return new Promise((resolve, reject) => {
          const blobStream = fileUpload.createWriteStream();

          blobStream.on('error', reject);

          blobStream.on('finish', () => {
            const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${process.env.storageBucket}/o/Messages%2F${filename}?alt=media`;
            resolve(fileUrl);
          });

          blobStream.end(newImgBuffer);
        });
      });

      const fileLinks = await Promise.all(uploadPromises);

      const createdMessages = await Message.insertMany(
        fileLinks.map((fileLink) => ({
          Sender: req.user._id,
          content: fileLink,
          chat: chatId,
          isFile: true,
        }))
      );
      let chat=await Chat.findById(chatId)
      chat.latestMessage=createdMessages[createdMessages.length - 1]._id;
      await chat.save();
      const populatedMessages = await Message.find({
        _id: { $in: createdMessages.map((msg) => msg._id) },
      }).populate("Sender", "_id Fullname Username avatarImage");
         console.log(populatedMessages)
         await invalidateCache(chatId)
      return res.status(201).json({ status: true, messages: populatedMessages });

    } catch (e) {
      return res.status(500).json({ status: false, error: e.message });
    }
  });
};


export const DeleteMessage = async (req, res, next) => {
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
      await invalidateCache(CurrentMessage.chatId)

      return res.json({ status: true, message: CurrentMessage });

  } catch (e) {
      console.error(e);
      return res.status(500).json({ status: false, error: e.message });
  }
};
