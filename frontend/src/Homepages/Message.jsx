import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import GetUsers from '../hooks/GetUsers';
import GetUser from './../hooks/GetUser';
import GetUserfromId from '../hooks/GetUserfromId';
const socket = io("http://localhost:3000/");
export default function Message() {
  const state=useSelector((state)=>state.user);
const [text,settext]=useState();
socket.on("recieve",(data)=>{
console.log(data);

})

  
    return (
      <div className="flex gap-20 lg:ml-96">
    
        <input type="text" onChange={(e)=>{
          settext({
            id:state.currentUser._id,message:e.target.value})
        }}/>
        <button onClick={()=>{
          if(text){
          socket.emit("get",text)
          }
          }}>send</button>
      </div>
    );
  }
  