import React, { useEffect, useState, useMemo } from 'react';
import { useContext } from 'react';
import { Socketcontext } from '../../context/Socketcontext';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function StartVideocall() {
  let { id } = useParams();
  let navigate = useNavigate();
  const state = useSelector((state) => state.user);
  const { socket } = useContext(Socketcontext);

  const Reciever = useMemo(() => new URLSearchParams(window.location.search), []);

  const [isCalling, setCalling] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);

  useEffect(() => {
    if (!socket || callAccepted) return;
  
    const timeoutDuration = 30000; // 30 seconds
    const callTimeout = setTimeout(() => {
      toast.error("Call not received");
      setCalling(false)
    }, timeoutDuration);
    const onCallCancel = ({ room }) => {
      clearTimeout(callTimeout)
      setCalling(false)
      toast.error("Call was rejected");
    };
  
    const beginCall = ({ room, User }) => {
      clearTimeout(callTimeout); 
      console.log(User)
      console.log(room,User)
      const queryString = new URLSearchParams({
        username: User.username,
        avatarImage: User.avatarImage,
      }).toString();
      console.log(queryString, "query");
      navigate(`/video/${room}?${queryString}`);
    };
  
  
  
    socket.on("call:cancelled", onCallCancel);
    socket.on("begin:call", beginCall);
  
    return () => {
      clearTimeout(callTimeout);
      socket.off("call:cancelled", onCallCancel);
      socket.off("begin:call", beginCall);
    };
  }, [socket, callAccepted]);
  
  const startCall = async () => {
    if (isCalling) return;
    setCalling(true);

    socket.emit("start:call", {
      room: id,
      User: {
        username: state.currentUser.Username,
        avatarImage: state.currentUser.avatarImage,
      },
    });
  };

  return (
    <div className="w-full max-w-sm p-8 mx-auto bg-white shadow-lg dark:bg-slate-900 rounded-xl">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <img
            src={Reciever.get("avatarImage")}
            alt="User profile"
            className="object-cover w-32 h-32 border-4 border-white rounded-full shadow-md"
          />
          <div className="absolute w-4 h-4 bg-green-400 border-2 border-white rounded-full bottom-2 right-2"></div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800">{Reciever.get("username")}</h2>

        <p className="text-gray-500">Online</p>

        <button
          onClick={startCall}
          disabled={isCalling}
          className="flex items-center justify-center px-8 py-3 space-x-2 text-white transition-all duration-200 rounded-full shadow-md bg-violet-600 hover:bg-violet-700 hover:scale-105"
        >
          <span>{isCalling ? 'Calling' : 'Start Call'}</span>
        </button>
      </div>
    </div>
  );
}
