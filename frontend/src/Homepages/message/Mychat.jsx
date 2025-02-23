import  { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addChat, chatStart, UpdateLatestMessage } from '../../Redux/Slice/ChatSlice';
import { Socketcontext } from '../../context/Socketcontext';
import CalcDate from './../../Components/CalcDate';
import { addMessage } from '../../Redux/Slice/MessageSlice';

export default function MyChat( {chats} ) {
    const state = useSelector((state) => state.user);
    const chatState=useSelector((state)=>state.chat)
    
 const navigate=useNavigate()


    const { _id,Fullname = "", Username = "", avatarImage = "" } = 
        chats?.users.find((user) => user._id !== state.currentUser._id) || {};
        
        
        const {socket}=useContext(Socketcontext);
const dispatch=useDispatch()

useEffect(()=>{
    const handleMessageReceived = (data) => {
        let msg=Array.isArray(data)?data[data.length-1]:data;
      let isoldChat=chatState?.chats.some((chat)=>chat._id==data.chat)
            if(!isoldChat){
                socket.emit('join-chat',({User:state.currentUser,room:data.chat}))
             dispatch(addChat(chats))
             return
            }
            if(chats._id==data.chat){
                dispatch(addMessage(data))
               dispatch(UpdateLatestMessage({id:data.chat,latestMessage:data}))
               new Notification(data.content)
            }
    };
    socket.on("message recieved",handleMessageReceived)
    return () => {
        socket.off("message recieved", handleMessageReceived);
    };
},[socket])
useEffect(()=>{
    socket.emit("join-chat",{User:state.currentUser,room:chats._id}) 
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
                <div className="m-1 w-14 h-14">
                    <img className="rounded-full w-14 h-14" src={chats.isGroupChat?chats.GroupChatimage:avatarImage} alt="avatar" />
                </div>
                <div className="flex-grow p-2">
                    <div className="flex justify-between text-md">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-200">{chats.isGroupChat?chats.chatName:Fullname}</div>
                        <div className="text-xs text-gray-400 dark:text-gray-300"><CalcDate date={chats?.latestMessage?.createdAt}/> ago</div>
                    </div>
                    <div className="w-40 text-sm text-gray-500 truncate dark:text-gray-400">
                      {chats.latestMessage && !chats.latestMessage.isFile ?chats.latestMessage?.content:"sent a photo"}
                    </div>
                </div>
            </div> 
        </div>
    );
}
