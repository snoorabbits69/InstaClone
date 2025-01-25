const Chat=require("../models/ChatModel")
const User=require("../models/UserModel")

let {upload}=require("../Multer/multer")
const {bucket}=require("../firebase/firebase");
const sharp=require('sharp');


module.exports.accessChat = async (req, res, next) => {
    try {
        const { Userid } = req.body;

        if (!Userid) {
            return res.sendStatus(400); 
        }

        let isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: Userid } } }
            ]
        }).populate("users", "-Password").populate("latestMessage");

       

        isChat = await User.populate(isChat, {
            path: "latestMessage.sender",
            select: "Fullname Username avatarImage"
        });

        console.log("isChat", isChat);

        if (isChat.length > 0) {
            return res.send(isChat[0]);
        } else {
            var chatData = {
                chatName: "sender", 
                isGroupChat: false,
                users: [req.user._id, Userid]
            };

            const createdChat = await Chat.create(chatData);
            console.log(createdChat);

            const fullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-Password");
            return res.status(200).json(fullChat);
        }
    } catch (e) {
        return res.json({ status: false, error: e });
    }
};


module.exports.fetchChat = async (req, res, next) => {
    try {
       
      const page = req.query.page || 1;
      const pageSize = req.query.pageSize || 20;
      const skip = (page - 1) * pageSize;
      let chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .skip(skip)
      .limit(pageSize).populate("users", "_id Fullname Username avatarImage")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })

    chats = await User.populate(chats, {
      path: "latestMessage",
      populate: {
          path: "Sender",  
          select: "Fullname Username avatarImage"  
        }
    });

    return res.status(200).json({ status: true, chat: chats });
      console.log(skip)
      
    } catch (e) {
      return res.status(500).json({ status: false, error: e });
    }
  };
  

  module.exports.createGroupChat = async (req, res, next) => {
    upload.single("file")(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ status: false, error: "File upload failed" });
      }
  console.log(req.body)
      try {
        let Users;
        if (typeof req.body.users === "string") {
          Users = req.body.users.split(',')
        } else {
          Users = req.body.users; 
        }
  
        if (!Array.isArray(Users) || Users.length < 2) {
          return res.status(400).json({ error: "Need at least 2 users" });
        }
  Users.push(req.user._id)
        console.log(Users);
        console.log(Users.length);
  
        if (req.file) {
          const filename = `${req.body.chatname}image${Date.now()}.webp`;
          const optimizedBuffer = await sharp(req.file.buffer)
            .resize(400, 800, { fit: "cover" })
            .webp()
            .toBuffer();
  
          const fileUpload = bucket.file(`GroupchatImages/${filename}`);
          const blobStream = fileUpload.createWriteStream();
  
          blobStream.end(optimizedBuffer);
  
          blobStream.on("finish", async () => {
            const groupChatImageUrl = `https://firebasestorage.googleapis.com/v0/b/${process.env.storageBucket}/o/GroupchatImages%2F${filename}?alt=media`;
  
            const GroupChat = await Chat.create({
              chatName: req.body.chatname,
              GroupChatimage: groupChatImageUrl,
              users: Users,
              isGroupChat: true,
              groupAdmin: req.user._id,
            });
  
            const FullGroupChat = await Chat.findOne({ _id: GroupChat._id }).populate(
              "users",
              "_id Username Fullname avatarImage"
            );
  
            return res.status(200).json({ status: true, chat: FullGroupChat });
          });
  
          blobStream.on("error", (uploadError) => {
            console.error(uploadError);
            return res.status(500).json({ status: false, error: "File upload failed" });
          });
        } else {
          const GroupChat = await Chat.create({
            chatName: req.body.chatname,
            users: Users,
            isGroupChat: true,
            groupAdmin: req.user._id,
          });
  
          const FullGroupChat = await Chat.findOne({ _id: GroupChat._id }).populate(
            "users",
            "_id Username Fullname avatarImage"
          );
  
          return res.status(200).json({ status: true, chat: FullGroupChat });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, error: "Internal Server Error" });
      }
    });
  };
  
  

module.exports.renameGroup=async(req,res,next)=>{
    try{
    const {chatId,chatName}=req.body;
    const findChat=await Chat.findById(chatId)
    if(!findChat){
        return res.json({error:"chat doesnt exist"})
    }
    if (findChat.groupAdmin!=req.user._id){
        return res.json({error:"invalid admin"})
    }
    findChat.chatName=chatName;
    await findChat.save()
    const updatedChat=await findChat.populate("users","_id Fullname Username avatarImage")
    return res.json({status:true,chat:updatedChat})
}catch(e){
    return res.json({status:false,error:e})
}
}

module.exports.addtoGroup=async(req,res,next)=>{
    try{
    const { chatId, userId } = req.body;
    const findChat=await Chat.findById(chatId);
    if(req.user._id!=findChat.groupAdmin){
        return res.json({error:"not allowed"})
    }
    findChat.users.push(userId)
    await findChat.save();
    const updatedChat=await findChat.populate("users","_id Fullname Username avatarImage")
    return res.status(200).json({status:true,chat:updatedChat})
    }catch(e){
        return res.status(500).json({status:false,error:e})
    }
  
    
}
module.exports.removeFromGroup=async(req,res,next)=>{
    try{
    const { chatId, userId } = req.body;
    const findChat=await Chat.findById(chatId);
    if(req.user._id!=findChat.groupAdmin){
        return res.json({error:"not allowed"})
    }
    findChat.users=findChat.users.filter((user)=>{
        return user!=userId
    })
    await findChat.save();
    const updatedChat=await findChat.populate("users","_id Fullname Username avatarImage")
    return res.status(200).json({status:true,chat:updatedChat})
    }catch(e){
        return res.status(500).json({status:false,error:e})
    }
  
    
}










