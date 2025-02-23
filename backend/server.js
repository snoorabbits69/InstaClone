import {config} from "dotenv";
import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import AuthRoutes from "./routes/AuthRoutes.js";
import UserRoutes from "./routes/userRoutes.js";
import PostRoutes from "./routes/PostRoutes.js";
import CommentRoutes from "./routes/CommentRoutes.js";
import ChatRoutes from "./routes/ChatRoutes.js";
import MessageRoutes from "./routes/MessageRoutes.js";
import SavedRoutes from "./routes/SaveRoutes.js"
import StoryRoutes from "./routes/StoryRoutes.js"
import { app, server} from "./socket/socket.js";
import dbConnect from "./config/dbConnection.js";
import { redisConnect } from "./config/RedisConnection.js";
import cron from "node-cron"
import os from "os"
import { availableParallelism} from "os";
import cluster from "cluster";

config({path:path.join(process.cwd(),".env")});



const PORT = process.env.PORT;

const corsconfig = {
  origin: [
    "http://localhost:5173",
    "https://tribes-equipment-tower-hostel.trycloudflare.com"
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};


// let NoofCpus=availableParallelism();

// if(cluster.isPrimary){
// for (let i=0;i<NoofCpus;i++){
//   cluster.fork();
// }
// cluster.on('exit',(worker,code,signal)=>{
//   console.log(`worker ${worker.process.pid} died`);
// })
// }
// else{

app.use(cors(corsconfig));
app.use(express.json());
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

dbConnect();
redisConnect();

const __dirname = path.resolve(); 
app.use(express.static(path.resolve(__dirname, "./file")));

app.use("/api/auth",AuthRoutes);
app.use("/api/user",UserRoutes);
app.use("/api/post",PostRoutes)
app.use("/api/chat",ChatRoutes)
app.use("/api/message",MessageRoutes)
app.use("/api/story",StoryRoutes)
app.use("/api",CommentRoutes);
app.use("/api",SavedRoutes);


server.listen(process.env.PORT,()=>{
    console.log("Server running on ",PORT);
})
// }