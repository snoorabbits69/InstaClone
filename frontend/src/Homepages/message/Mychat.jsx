import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { chatStart } from '../../Redux/Slice/ChatSlice';
import { Socketcontext } from '../../context/Socketcontext';

export default function MyChat( {chats} ) {
    const state = useSelector((state) => state.user);
 const navigate=useNavigate()


    const { _id,Fullname = "", Username = "", avatarImage = "" } = 
        chats.users.find((user) => user._id !== state.currentUser._id) || {};
        
        
        const {socket}=useContext(Socketcontext);
const dispatch=useDispatch()
useEffect(()=>{
    socket.emit("join-chat",{user:state.currentUser.Fullname,room:chats._id})
    socket.emit("isonline",state.currentUser._id)
        
        const handleTyping = (message) => {
            console.log(message);
        };

        socket.on("typing",handleTyping)
     return () => {
            socket.off("typing", handleTyping);
     }
},[])
    return (
        <div className={"p-1 m-1 rounded-md conversation-item dark:bg-gray-700 hover:bg-gray-200"} onClick={()=>{
        navigate(`/message/${chats.isGroupChat?chats.chatName:Username}`)
        dispatch(chatStart(chats))
}}>
            <div className="flex items-center p-2 cursor-pointer">
                <div className="w-12 h-12 m-1">
                    <img className="rounded-full" src={chats.isGroupChat?chats.GroupChatimage:avatarImage} alt="avatar" />
                </div>
                <div className="flex-grow p-2">
                    <div className="flex justify-between text-md">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-200">{chats.isGroupChat?chats.chatName:Fullname}</div>
                        <div className="text-xs text-gray-400 dark:text-gray-300">time</div>
                    </div>
                    <div className="w-40 text-sm text-gray-500 truncate dark:text-gray-400">
                      {chats.latestMessage?chats.latestMessage?.content:""}
                    </div>
                </div>
            </div> 
        </div>
    );
}
