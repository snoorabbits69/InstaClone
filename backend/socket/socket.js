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
let UserIdtoSocketMap=new Map()
let SocketIdToUserMap=new Map()
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

socket.on("start:call",({room,User})=>{
    console.log(room,User)
    socket.to(room).emit("call:started",{room,User})
})

socket.on("begin:call",({room,User})=>{
    console.log(room,User,"begin:call")
socket.to(room).emit("begin:call",{room,User})
})
socket.on('user:call',({room,offer,User})=>{
    console.log(room,offer,User)
    
socket.to(room).emit('incoming:call',{offer:offer,room:room,User:User})
})
socket.on("call:accepted", ({ room, answer,User }) => {
    console.log(answer,"ans")
    socket.to(room).emit("call:answered", { answer,User });

});
socket.on("call:cancelled",({room})=>{
    console.log(room,"cancelled")
socket.to(room).emit("call:cancelled",{cancelled:true})
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
