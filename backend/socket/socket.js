const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});
let onlineUsers=[];
io.on("connection", (socket) => {
 onlineUsers.push(socket.id)
io.emit("online",onlineUsers)
socket.on("follow",(msg)=>{
    console.log(msg);
})
socket.on("join-chat",({user,room})=>{
    console.log(room)
    socket.join(room);
  
   
})
socket.on("typing",(room)=>{
    socket.in(room).emit("typing")
})

    socket.on("new message", (newMessageRecieved) => {
       let chat = newMessageRecieved.chat;
    
        if (!chat.users) return console.log("chat.users not defined");
    
        chat.users.forEach((user) => {
          if (user._id == newMessageRecieved.sender._id) return;
    
          socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
      });
    
      socket.on("disconnect", () => {
        console.log(socket.id + " disconnected");
        onlineUsers=onlineUsers.filter((user)=>{
            user!=socket.id
        })
    });
});

module.exports = { app, server, io };
