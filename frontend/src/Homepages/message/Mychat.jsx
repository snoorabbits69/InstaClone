import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchChatRoutes } from '../../../utils/ApiRoutes';

export default function Mychat({message,time,name,active}) {
  const chatState = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const fetchChats = async () => {
    try {
      const { data } = await axios.get(FetchChatRoutes);

      // Dispatch an action with a type and payload
      dispatch({ type:'setChats', payload: data.chat });
      console.log(chatState)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
        <div className={'conversation-item p-1 dark:bg-gray-700 hover:bg-gray-200 m-1 rounded-md '} >
            <div className={'flex items-center p-2  cursor-pointer  '}>
                <div className="m-1 w-7 h-7">
                    <img className="rounded-full" src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png" alt="avatar"/>
                </div>
                <div className="flex-grow p-2">
                    <div className="flex justify-between text-md ">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-200">{name}</div>
                        <div className="text-xs text-gray-400 dark:text-gray-300">{time}</div>
                    </div>
                    <div className="w-40 text-sm text-gray-500 truncate dark:text-gray-400">
                    {message}
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}
