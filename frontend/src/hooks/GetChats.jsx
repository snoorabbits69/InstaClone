import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FetchChatRoutes } from '../../utils/ApiRoutes'

export default function GetChats(page) {
let [chats,setchats]=useState()
let [loading,setloading]=useState(true)
    useEffect(()=>{
let fetchChats=async()=>{
    try{
   const {data}= await axios.get(FetchChatRoutes(page))
 
   if(!data.status){
    return
   }
   setchats(data.chat)
   setloading(false)
}catch(e){
  
    setloading(false)
}
}
fetchChats()
    },[page])
 
    return {chats,loading}
}
