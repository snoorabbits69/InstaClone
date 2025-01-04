const Chat=require("../models/ChatModel")
const User=require("../models/UserModel")
module.exports.accessChat = async (req, res, next) => {
    try {
        const { Userid } = req.body;

        if (!Userid) {
            return res.sendStatus(400); // Bad request if no Userid is provided
        }

        let isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: Userid } } }
            ]
        }).populate("users", "-Password").populate("latestMessage");

        console.log("isChat1", isChat);

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
        .populate("users", "_id Fullname Username avatarImage")
        .populate("groupAdmin", "-Password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(pageSize);
  
      chats = await User.populate(chats, {
        path: "latestMessage",
        populate: {
            path: "Sender",  
            select: "Fullname Username avatarImage"  
          }
      });
  console.log(chats)
      return res.status(200).json({ status: true, chat: chats });
    } catch (e) {
      return res.status(500).json({ status: false, error: e });
    }
  };
  

module.exports.createGroupChat=async(req,res,next)=>{
    
    if(!req.body.users || !req.body.name){
return res.status(400).send({error:"incomplete fields"})
    }
    let users=JSON.parse(req.body.users)
    console.log(users)
  if(users.length<2){
    return res.status(400).send({error:"needs more than 2 for a group chat"})
  }
    try{
        const GroupChat=await Chat.create({
            chatName:req.body.name,
            users:users,
            isGroupChat:true,
            groupAdmin:req.user._id
        })
        const FullGroupChat=await Chat.findOne({_id:GroupChat._id}).populate("users","_id Username Fullname avatarImage")
res.status(200).json({status:true,chat:FullGroupChat})

    }catch(e){
        return res.status(500).json({status:false,error:e})
    }
}

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