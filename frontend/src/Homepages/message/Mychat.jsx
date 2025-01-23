import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addChat, chatStart, UpdateChats } from '../../Redux/Slice/ChatSlice';
import { Socketcontext } from '../../context/Socketcontext';

export default function MyChat( {chats} ) {
   
    const state = useSelector((state) => state.user);
    const chatState=useSelector((state)=>state.chat)
    
 const navigate=useNavigate()


    const { _id,Fullname = "", Username = "", avatarImage = "" } = 
        chats.users.find((user) => user._id !== state.currentUser._id) || {};
        
        
        const {socket}=useContext(Socketcontext);
const dispatch=useDispatch()

useEffect(()=>{
    const handleMessageReceived = (data) => {
      let isoldChat=chatState?.chats.some((chat)=>chat._id==data.chat)
            if(!isoldChat){
             dispatch(addChat(chats))
             return
            }
            if(chats._id==data.chat){
               dispatch(UpdateChats({id:data.chat,latestMessage:data}))
               new Notification(data.content)
            }
    };
    socket.on("message recieved",handleMessageReceived)
    return () => {
        socket.off("message recieved", handleMessageReceived);
    };
},[socket])
useEffect(()=>{
    socket.emit("join-chat",{user:state.currentUser.Fullname,room:chats._id})
    socket.emit("isonline",state.currentUser._id)
        
     let handleincomingcall=(offer)=>{
            console.log(offer);
        }
        socket.on('incoming:call',handleincomingcall)
     
      
        const handleTyping = (message) => {
            console.log(message);
        };

        socket.on("typing",handleTyping)
     return () => {
            socket.off("typing", handleTyping);
            
            socket.off('incoming:call',handleincomingcall);
     }
},[])
function getDate(date) {
    if (!date) {
        return "";
    }

    let currentDate = new Date();
    let msgDate = new Date(date);
    let sendTime = Math.floor((currentDate - msgDate) / 1000); 

    if (sendTime < 60) {
        return "Just now"; 
    } else if (sendTime < 3600) {
        return Math.floor(sendTime / 60) + 'm ago'; 
    } else if (sendTime < 86400) {
        return Math.floor(sendTime / 3600) + 'hrs ago'; 
    } else {
        return Math.floor(sendTime / 86400) + 'days ago'; 
    }
}

    return (
        <div className={"p-1 m-1 rounded-md conversation-item dark:bg-gray-700 hover:bg-gray-200"} onClick={()=>{
        navigate(`/message/${chats.isGroupChat?chats.chatName:Username}`)
        dispatch(chatStart(chats))
}}>
            <div className="flex items-center p-2 cursor-pointer">
                <div className="m-1 w-14 h-14">
                    <img className="rounded-full w-14 h-14" src={chats.isGroupChat?chats.GroupChatimage:avatarImage} alt="avatar" />
                </div>
                <div className="flex-grow p-2">
                    <div className="flex justify-between text-md">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-200">{chats.isGroupChat?chats.chatName:Fullname}</div>
                        <div className="text-xs text-gray-400 dark:text-gray-300">{getDate(chats?.latestMessage?.createdAt)}</div>
                    </div>
                    <div className="w-40 text-sm text-gray-500 truncate dark:text-gray-400">
                      {chats.latestMessage?chats.latestMessage?.content:""}
                    </div>
                </div>
            </div> 
        </div>
    );
}
