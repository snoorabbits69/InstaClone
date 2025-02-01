import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

let onlineUsers={}
try{
io.on("connection", (socket) => {
    socket.on("isonline",(id)=>{
 onlineUsers[socket.id]=id
 io.emit("online",onlineUsers)

    })
    
socket.on("follow",(msg)=>{
     
})
socket.on("join-chat",({user,room})=>{
   
    console.log(room,user)
    socket.join(room);
  
   
})
socket.on('user:call',({room,offer})=>{
    console.log(room,offer)
io.to(room).emit('incoming:call',{offer:offer,room:room})
})
socket.on("typing",(room)=>{
    socket.in(room).emit("typing","typing")
    console.log("typing");
})

    socket.on("sendMessage", (newMessageRecieved) => {
    console.log(newMessageRecieved)
       
      socket.to(newMessageRecieved.chat).emit("message recieved", newMessageRecieved);
       
      });
    
      socket.on("disconnect", () => {
        console.log(socket.id + " disconnected");
         delete onlineUsers[socket.id]
         io.emit("online",onlineUsers)
    });
});
}
catch(e){
    console.log(e)
}
export { app, server, io };
