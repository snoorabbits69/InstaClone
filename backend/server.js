const express=require("express");
const dotenv=require("dotenv").config();
const app=express();
const cors=require("cors");
const userRoutes=require("./routes/userRoutes");

const PORT=process.env.PORT;
console.log(PORT);
const dbConnect=require("./config/dbConnection");
app.use(cors());
app.use(express.json());
dbConnect();
app.use("/api/auth",userRoutes);
app.listen(PORT,()=>{
    console.log("Server running on ",PORT);
})