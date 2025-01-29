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
import { app, server} from "./socket/socket.js";
import dbConnect from "./config/dbConnection.js";
import { redisConnect } from "./config/RedisConnection.js";

config({path:path.join(process.cwd(),".env")});



const PORT = process.env.PORT;

const corsconfig = {
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
};

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
app.use("/api",CommentRoutes);
app.use("/api",SavedRoutes);

server.listen(process.env.PORT,()=>{
    console.log("Server running on ",PORT);
})
