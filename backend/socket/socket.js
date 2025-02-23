import express from "express";
import { Server } from "socket.io";
import http from "http";
import Message from "../models/MessageModel.js"
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "https://tribes-equipment-tower-hostel.trycloudflare.com"
        ],
        methods: ["GET", "POST"]
    }
});

let onlineUsersfromsocket={}
let onlineUsersfromid={}
let activeCalls={}
try{
io.on("connection", (socket) => {
    socket.on("isonline",(id)=>{
        console.log(id)
 onlineUsersfromsocket[socket.id]=id
 onlineUsersfromid[id]=socket.id
 console.log(onlineUsersfromid)
 io.emit("online",onlineUsersfromid)

    })
    
socket.on("followrequest",(msg)=>{
    console.log("follow",msg,msg,onlineUsersfromid[msg.id])
    if(onlineUsersfromid[msg.id]){
     socket.to(onlineUsersfromid[msg.id]).emit('follow:request',{id:msg.id})
    }
})
socket.on("join-chat",({User,room})=>{
   
    socket.join(room);
})

socket.on("start:call",({room,User})=>{
    console.log(room,User)
    socket.to(room).emit("call:started",{room,User})
})

socket.on("begin:call",({room,User})=>{
    console.log(room,User,"begin:call")
socket.to(room).emit("begin:call",{room,User})
})
socket.on('user:call',({room,offer,User})=>{
    if (!activeCalls[room]) activeCalls[room] = [];
    activeCalls[room].push(socket.id)
    console.log(room,offer,User)
    
socket.to(room).emit('incoming:call',{offer:offer,room:room,User:User})
})
socket.on("call:accepted", ({ room, answer,User }) => {
    activeCalls[room].push(socket.id)
    console.log(answer,"ans")
    socket.to(room).emit("call:answered", { answer,User });


});
socket.on("call:cancelled",({room})=>{
    console.log(room,"cancelled")
socket.to(room).emit("call:cancelled",{cancelled:true})
if (activeCalls[room]) {
    activeCalls[room] = activeCalls[room].filter(id => id !== socket.id);
    if (activeCalls[room].length === 0) delete activeCalls[room];
}

})
socket.on("ice-candidate",({room,candidate})=>{
    console.log(candidate,candidate)
    socket.to(room).emit("ice-candidate",candidate)
})
socket.on("typing",(room)=>{
    socket.in(room).emit("typing","typing")
    console.log("typing");
})

    socket.on("sendMessage", (newMessageRecieved) => {
    console.log(newMessageRecieved)
       
      socket.to(newMessageRecieved.chat).emit("message recieved", newMessageRecieved);
       
      });
      socket.on("messageRead", async ({ messageId, userId, chatId }) => {
        await Message.findByIdAndUpdate(
          messageId,
          { $addToSet: { readBy: userId } },
          { new: true }
        );
          io.to(chatId).emit("messageReadUpdate", { messageId, userId });
      });
      socket.on("end:call",({room})=>{
        console.log(room)
        socket.to(room).emit('call:end',{room:room})
        delete activeCalls[room]
      })
      socket.on("disconnect", () => {
        console.log(socket.id + " disconnected");
    
        // Remove the user from onlineUsersfromsocket by socket.id
        delete onlineUsersfromsocket[socket.id];
    
        // Also remove the user from onlineUsersfromid where the socket.id matches
        for (const [id, socketId] of Object.entries(onlineUsersfromid)) {
            if (socketId === socket.id) {
                delete onlineUsersfromid[id];  // Remove the user by their ID
                break;  // No need to continue once we find the match
            }
        }
    
        io.emit("online", onlineUsersfromsocket);
    
        for (const [room, participants] of Object.entries(activeCalls)) {
            if (participants.includes(socket.id)) {
                const otherUser = participants.find(id => id !== socket.id);
                if (otherUser) {
                    io.to(room).emit("peer-disconnected", { peerId: socket.id });
                }
                activeCalls[room] = participants.filter(id => id !== socket.id);
                if (activeCalls[room].length === 0) delete activeCalls[room];
                break;
            }
        }
    });
    
});
}
catch(e){
    console.log(e)
}
export { app, server, io };
