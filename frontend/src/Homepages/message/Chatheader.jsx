import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaVideo } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

export default function Chatheader({ setshowusers, showusers, Users, online }) {
  const navigate = useNavigate();
  const { _id, isGroupChat, GroupChatimage, chatName } = useSelector((state) => state.chat.selectedChat);

  return (
    <div className="w-full p-1 rounded-bl-none rounded-br-none shadow-md h-15 dark:bg-gray-800 rounded-xl">
      <div className="flex items-center p-2 align-middle">
        <div
          className="p-2 mr-1 text-black rounded-full hover:bg-blue-100"
          onClick={() => {
            navigate("/message");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </div>
        <div className="border border-white rounded-full p-1/2">
          <img
            className="rounded-full w-14 h-14"
            src={isGroupChat ? GroupChatimage : Users[0].avatarImage}
            alt="avatar"
          />
        </div>
        <div className="flex-grow p-2">
          <div className="font-semibold text-md">
            {isGroupChat ? chatName : Users[0].Fullname}
          </div>
          <div className="flex items-center">
            {online ? (
              <>
                <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                <div className="ml-1 text-xs">Online</div>
              </>
            ) : (
              <div className="ml-1 text-xs">Offline</div>
            )}
          </div>
        </div>
        <button
          onClick={() => {
            let context = {
              username: isGroupChat ? chatName : Users[0]?.Fullname || "Unknown",
              avatarImage: isGroupChat ? GroupChatimage : Users[0]?.avatarImage || "",
            };
            
            Object.keys(context).forEach((key) => {
              if (typeof context[key] !== "string") {
                context[key] = String(context[key]);
              }
            });
            
            const queryString = new URLSearchParams(context).toString();
            console.log(queryString);
           
            
            // Proper window.open() parameters
            navigate(`/startvideocall/${_id}?${queryString}`);
            
          }}
        >
          <FaVideo className="mr-4 text-3xl" />
        </button>
        <button
          className="z-50 p-2 text-black rounded-full cursor-pointer hover:bg-blue-100"
          onClick={() => {
            setshowusers(!showusers);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
