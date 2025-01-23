import { useEffect, useState } from 'react'
import { FetchChatRoutes } from '../../utils/ApiRoutes'
import apiRequest from './../Components/axios';

export default function GetChats(page) {
let [chats,setchats]=useState()
let [loading,setloading]=useState(true)
    useEffect(()=>{
let fetchChats=async()=>{
   const data= await apiRequest('GET',FetchChatRoutes(page))
   if(!data.status){
    setchats(data.chat)
setloading(false)
}


}
fetchChats()
    },[page])
 
    return {chats,loading}
}
