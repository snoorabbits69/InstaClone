import React from 'react'
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

io.connect("http://localhost:3000",{query:{
  userId:"sd"
}});
export default function Message() {
  const state=useSelector((state)=>state.user);
  return (
  <div className="flex justify-around gap-20 ">
    <div>sdfdsf</div>
    <div className="items-end">sdffd</div>
  </div>
  )
}
