import React, { useEffect, useState } from 'react'
import Mychat from './Mychat'
import { useDispatch, useSelector} from 'react-redux';
import { FetchChatRoutes } from '../../../utils/ApiRoutes';
import axios from 'axios';

export default function Mychats() {
    const dispatch = useDispatch();
    const state=useSelector((state)=>state.user)
    const [sender,setsender]=useState([])
  const fetchChats = async () => {
    try {
      const { data } = await axios.get(FetchChatRoutes);

  setsender(data.chat)
      dispatch({ type:'setChats', payload: Array.isArray(data.chat) ? data.chat : [data.chat] });
    

    } catch (e) {
      console.log(e);
    }
  };

useEffect(()=>{
    fetchChats()
   
},[])
 



      return (
        <div className="p-1">
            {
                sender?.map((item, index) => (
                    <Mychat
                        Username={item.Username}
        avatarImage={item.avatarImage}
                       Fullname={item.Fullname}
                    key={index}
                    />
                ))
            }
        </div>
    )
}
