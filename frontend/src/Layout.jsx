import React, { useContext, useEffect, useState, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Socketcontext } from "./context/Socketcontext";
import callAudio from "./assets/audio/Call.mp3";
import { IoCall } from "react-icons/io5";
import { MdAddIcCall } from "react-icons/md";
import {  useSelector } from "react-redux";
import HomeSidebar from "./Sidebar/HomeSidebar";
export default function Layout() {
  const state = useSelector((state) => state.user);
  let navigate = useNavigate();
  let [User, setUser] = useState(null);
  let [room, setRoom] = useState(null);
  let [acceptCall, setAcceptCall] = useState(false);
  let audioRef = useRef(new Audio(callAudio)); 
  const { socket } = useContext(Socketcontext);

  const location=useLocation()
  const shouldRenderSidebar = state.currentUser && 
  !(location.pathname.startsWith("/addtostory") || location.pathname.startsWith("/story"));


  useEffect(() => {
    function callStarted({ User, room }) {
      setUser(User);
      setRoom(room);

      audioRef.current.loop = true;
      audioRef.current.play().catch(console.error);

      const timeout = setTimeout(() => {
        setUser(null);
        audioRef.current.pause();
      }, 30000);

      return () => clearTimeout(timeout);
    }
  
     

    socket.on("call:started", callStarted);

    return () => {
      socket.off("call:started",callStarted );
    };
  }, [socket]);

  async function AcceptCall() {
    socket.emit("begin:call",{room,User:{
      username:state?.currentUser?.Username,
      avatarImage:state?.currentUser?.avatarImage,
     }})
    setAcceptCall(true);

    

    audioRef.current.pause();
  
    const queryString = new URLSearchParams({
      username: User.username,
      avatarImage: User.avatarImage,
    }).toString();
   console.log(queryString,"query")
    navigate(`video/${room}?${queryString}`);
    setUser("");
  }

  return (
    <div>
      {shouldRenderSidebar && <HomeSidebar/>}
      <Outlet />
      {User && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-sm p-8 mx-auto bg-white shadow-lg rounded-xl">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <img
                  src={User.avatarImage}
                  alt="User profile"
                  className="object-cover w-32 h-32 border-4 border-white rounded-full shadow-md"
                />
                <div className="absolute w-4 h-4 bg-green-400 border-2 border-white rounded-full bottom-2 right-2"></div>
              </div>

              <h2 className="text-2xl font-semibold text-gray-800">
                {User.username}
              </h2>
              <p className="text-gray-500">Online</p>

              <div className="flex items-center gap-4 mt-6">
                <button
                  onClick={AcceptCall}
                  className="px-8 py-6 text-2xl transition-all bg-green-500 rounded-full hover:bg-green-600 hover:scale-105"
                >
                  <IoCall />
                </button>
                <button
                  onClick={() => {
                    setUser(null);
                    audioRef.current.pause();
                    socket.emit("call:cancelled", { room });
                  }}
                  className="px-8 py-6 text-2xl transition-all bg-red-500 rounded-full hover:bg-red-600 hover:scale-105"
                >
                  <MdAddIcCall />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
