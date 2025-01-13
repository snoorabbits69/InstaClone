import React, { useEffect, useState } from 'react'
import { current } from '@reduxjs/toolkit';
import axios from 'axios';
import { CreateGroupRoute } from '../../../utils/ApiRoutes';


export default function Addgroup({setdialogstatus}) {
  let [chatimg,setchatimg]=useState()
  let [chatdata,setchatdata]=useState({chatname:"",users:[]})
return(

  <div className="relative py-3 sm:max-w-xl sm:mx-auto">
    <div className="relative px-4 py-10 mx-8 bg-white shadow md:mx-0 rounded-3xl sm:p-10">
      <div className="max-w-md mx-auto">
        
        <div className="flex items-center space-x-5">
          <div className="self-start block pl-2 text-xl font-semibold text-gray-700">
            <h2 className="leading-relaxed">Create Group Chat</h2>
          </div>
        </div>
        <div className="divide-y divide-gray-200">

        <div className="py-8 space-y-4 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
            <div className="flex flex-col">
              <label className="leading-loose">ChatImage</label>
              <input type="file" className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md" onChange={(e)=>{
setchatimg(e.target.files[0])
console.log(chatimg)
              }}/>
            </div>
     
          </div>
          <div className="py-8 space-y-4 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
            <div className="flex flex-col">
              <label className="leading-loose">Chat Name</label>
              <input type="text" className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none" placeholder="Chatname" onChange={(e)=>{
           setchatdata((prev) => ({ ...prev, chatname: e.target.value }));

             }} />
            </div>
            <div className="flex flex-col">
              <label className="leading-loose">Users</label>
              <input type="text" className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none" placeholder="Optional" />
            </div>
            <div className="flex items-center space-x-4">
           
           
            </div>
     
          </div>
          <div className="flex items-center pt-4 space-x-4 text-sm">
              <button className="flex items-center justify-center w-full px-4 py-3 text-gray-900 rounded-md focus:outline-none" onClick={()=>{
setdialogstatus(false)
              }}>
Cancel
              </button>
              <button className="flex items-center justify-center w-full px-4 py-3 text-white bg-blue-500 rounded-md focus:outline-none" onClick={async()=>{
const Newgroup=new FormData();
Newgroup.append('file',chatimg);
Newgroup.append('chatname',chatdata.chatname)
Newgroup.append('users',chatdata.users)
console.log(Newgroup.get('chatdata'))
try{
const {data}=await axios.post(CreateGroupRoute,Newgroup,{
  withCredentials:true,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})
console.log(data)
}catch(e){
console.error(e)
}
              }}>Create</button>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}
