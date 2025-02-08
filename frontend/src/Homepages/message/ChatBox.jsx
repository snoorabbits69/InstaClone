import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Socketcontext } from '../../context/Socketcontext';
import { addChat } from '../../Redux/Slice/ChatSlice';
import { setMessages,addMessage } from '../../Redux/Slice/MessageSlice'; // Import setMessages action
import GetMessages from '../../hooks/GetMessages';
import Sendmessage from './Sendmessage';
import Chatheader from './Chatheader';
import ChatContent from './ChatContent';
import ChatInfo from './ChatInfo';

export default function ChatBox() {
    const [online, setOnline] = useState(false);
    const navigate = useNavigate();
    const [showusers, setshowusers] = useState(false);
    const state = useSelector((state) => state.user);
    const chatState = useSelector((state) => state.chat);
    const messages = useSelector((state) => state.message.messages); 
    const dispatch = useDispatch();
    const { socket } = useContext(Socketcontext);

    if (!chatState.selectedChat) {
        navigate("/message");
        return null;
    }

    const { _id, isGroupChat, GroupChatimage, chatName } = chatState.selectedChat;
    const Users = chatState.selectedChat.users.filter((user) => user._id !== state.currentUser._id) || [];
    const Currentchatmsg = GetMessages(_id);

    useEffect(() => {
        if (!Currentchatmsg.loading) {
            dispatch(setMessages(Currentchatmsg.messages)); // Dispatch the messages to Redux
        }
    }, [Currentchatmsg.messages, Currentchatmsg.loading, dispatch]);

    useEffect(() => {
        let allmsg = document.getElementById("Allmsg");
        if (allmsg) {
            allmsg.scrollTop = allmsg.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        const handleMessageReceived = (data) => {
            console.log(data)
            const isOldChat = chatState?.chats.some((chat) => chat._id === data.chat);
            if (!isOldChat) {
                dispatch(addChat(chatState.selectedChat));
                return ;
            }
            dispatch(addMessage(data)); 
        };

        const handleOnlineStatus = (data) => {
            setOnline(Users.some((user) => data[user._id]));
        };

        socket.on("message recieved", handleMessageReceived);
        socket.on("online", handleOnlineStatus);

        return () => {
            socket.off("message received", handleMessageReceived);
            socket.off("online", handleOnlineStatus);
        };
    }, [socket, chatState.selectedChat, Users]);

    return (
        <div className="flex flex-col flex-grow h-full">
            <Chatheader setshowusers={setshowusers} showusers={showusers} Users={Users} online={online} />
            <div className="flex-grow w-full p-2 my-1 overflow-y-auto bg-gray-100 dark:bg-gray-900" id="Allmsg">
                <ChatContent messages={messages} />
            </div>
            <Sendmessage messages={messages} />
            {showusers && <ChatInfo />}
        </div>
    );
}
