import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { chatStart } from '../../Redux/Slice/ChatSlice';

export default function MyChat( {chats} ) {
    const state = useSelector((state) => state.user);
 const navigate=useNavigate()

    const { Fullname = "", Username = "", avatarImage = "" } = 
        chats.users.find((user) => user._id !== state.currentUser._id) || {};
const dispatch=useDispatch()
       
    return (
        <div className="p-1 m-1 rounded-md conversation-item dark:bg-gray-700 hover:bg-gray-200" onClick={()=>{
        navigate(`/message/${Username}`)
        dispatch(chatStart({id:chats._id,Fullname, Username,avatarImage,isGroupChat:chats.isGroupChat  }))

        }}>
            <div className="flex items-center p-2 cursor-pointer">
                <div className="w-12 h-12 m-1">
                    <img className="rounded-full" src={avatarImage} alt="avatar" />
                </div>
                <div className="flex-grow p-2">
                    <div className="flex justify-between text-md">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-200">{Fullname}</div>
                        <div className="text-xs text-gray-400 dark:text-gray-300">time</div>
                    </div>
                    <div className="w-40 text-sm text-gray-500 truncate dark:text-gray-400">
                       Message
                    </div>
                </div>
            </div> 
        </div>
    );
}
