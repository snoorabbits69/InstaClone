import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getMessagesRoute } from '../../utils/ApiRoutes';

export default function GetMessages(chatid) {
   
 const [loading,setLoading]=useState(true)
 const [messages,setmessages]=useState([]);
 useEffect(()=>{
    async function GetMsgs() {
        
try{
    const {data}=await axios.get(getMessagesRoute(chatid))

if(data.status){
    setmessages(data.messages);
    setLoading(false);
}
}catch(e){
    console.error(e);
}
    }
    GetMsgs();
 },[chatid])
 return {messages,loading}
}
