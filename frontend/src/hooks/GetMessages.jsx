import  { useEffect, useState } from 'react'
import { getMessagesRoute } from '../../utils/ApiRoutes';
import apiRequest from '../Components/axios';

export default function GetMessages(chatid) {
   
 const [loading,setLoading]=useState(true)
 const [messages,setmessages]=useState([]);
 useEffect(()=>{
    async function GetMsgs() {
    const data=await apiRequest('GET',getMessagesRoute(chatid))
if(data.status){
    setmessages(data.messages);
    setLoading(false);
}
    }
    GetMsgs();
 },[chatid])
 return {messages,loading}
}
