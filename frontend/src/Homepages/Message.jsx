import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000/");

export default function Message() {
  const state = useSelector((state) => state.user);
  const [text, setText] = useState({ id: '12', message: '' });


  const handleSend = () => {
    if (text.message) {
      socket.connect();
      socket.emit("get", text);
      socket.on("recieve",(arg)=>{
        console.log(arg);
      })
    socket.disconnect();
    }

  };

  return (
    <div className="flex gap-20 lg:ml-96">
      <input
        type="text"
        onChange={(e) =>
          setText((prev) => ({ ...prev, message: e.target.value }))
        }
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
