const express=require("express");
const path=require("path");
const dotenv=require("dotenv").config();
const cors=require("cors");
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
const AuthRoutes=require("./routes/AuthRoutes");
const UserRoutes=require("./routes/UserRoutes");
const PostRoutes=require("./routes/PostRoutes")
const CommentRoutes=require("./routes/CommentRoutes")
const ChatRoutes=require("./routes/ChatRoutes")
const MessageRoutes=require("./routes/MessageRoutes")
const PORT=process.env.PORT;
const {app,server,io}=require("./socket/socket");
const dbConnect=require("./config/dbConnection");
const {redisConnect}=require('./config/RedisConnection')
const corsconfig={
    origin: 'http://localhost:5173', 
    credentials: true, 
    optionsSuccessStatus: 200 }
app.use(cors(corsconfig));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser())
dbConnect();
redisConnect();
const jwt=require("jsonwebtoken");
app.use(express.static(path.resolve("./file")));
app.use("/api/auth",AuthRoutes);
app.use("/api/user",UserRoutes);
app.use("/api/post",PostRoutes)
app.use("/api/chat",ChatRoutes)
app.use("/api/message",MessageRoutes)
app.use("/api",CommentRoutes);

server.listen(PORT,()=>{
    console.log("Server running on ",PORT);
})
