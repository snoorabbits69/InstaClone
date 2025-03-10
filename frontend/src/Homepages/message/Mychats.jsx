import  { useContext, useEffect, useState } from 'react';
import Mychat from './Mychat';
import { useDispatch, useSelector } from 'react-redux';
import { setChats } from '../../Redux/Slice/ChatSlice';
import GetChats from '../../hooks/GetChats';
import { Socketcontext } from '../../context/Socketcontext';

export default function Mychats() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.user);
    const chatstate = useSelector((state) => state.chat);

    const [page, setPage] = useState(1);

    const { chats, loading } = GetChats(page);

    useEffect(() => {
        if (!loading && chats && chats.length > 0) {
            const filteredChats = chats.filter(chat => {
                return chat?.latestMessage && (chat?.isGroupChat || chat?.latestMessage);
            });
    
            const sortedChats = [...filteredChats].sort(
                (a, b) => new Date(b?.latestMessage?.createdAt) - new Date(a?.latestMessage?.createdAt)
            );
    
            dispatch(setChats(sortedChats));
        }
    }, [chats, loading, dispatch]);
    

    return (
        <div className="p-1">
            {loading ? (
                "Loading..."
            ) : chatstate.chats.length > 0 ? (
                chatstate.chats.map((item, i) => (
                    <Mychat chats={item} key={i} />
                ))
            ) : (
                "No chats available"
            )}
        </div>
    );
}
