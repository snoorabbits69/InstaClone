const express=require("express");
const {Server}=require("socket.io");
const http=require("http");
const app=express();
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
})

io.on("connection",(socket)=>{
    console.log(socket.id);

})

module.exports={app,server,io};
