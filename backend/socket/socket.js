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

io.on("connection", (socket) => {
    console.log("User " + socket.id + " connected");

    socket.on("get", (arg) => {
      socket.join(arg.id);
      console.log(arg.id);
      socket.to(arg.id).emit("recieve",arg);
     
    });

    socket.on("disconnect", () => {
        console.log(socket.id + " disconnected");
        
    });
});

module.exports = { app, server, io };
