import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FetchChatRoutes } from '../../utils/ApiRoutes'

export default function GetChats(page) {
let [chats,setchats]=useState()
let [loading,setloading]=useState(true)
    useEffect(()=>{
let fetchChats=async()=>{
    console.log(FetchChatRoutes(page))
   const {data}= await axios.get(FetchChatRoutes(1))
 
   if(!data.status){
    return
   }
   setchats(data.chat)
   setloading(false)
}
fetchChats()
    },[page])
 
    return {chats,loading}
}
