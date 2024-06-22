const express=require("express");
const path=require("path");
const dotenv=require("dotenv").config();
const cors=require("cors");
const AuthRoutes=require("./routes/AuthRoutes");
const UserRoutes=require("./routes/UserRoutes");
const PORT=process.env.PORT;
const {app,server,io}=require("./socket/socket");
const dbConnect=require("./config/dbConnection");
const corsconfig={
    origin: 'http://localhost:5173', 
    credentials: true, 
    optionsSuccessStatus: 200 }
app.use(cors(corsconfig));
app.use(express.json());
dbConnect();
app.use(express.static(path.resolve("./file")));
console.log(io);
app.use("/api/auth",AuthRoutes);
app.use("/api/user",UserRoutes);
server.listen(PORT,()=>{
    console.log("Server running on ",PORT);
})