import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Socketcontext } from './../../context/Socketcontext';

export default function ChatBox() {
 const navigate=useNavigate()
 const state=useSelector((state)=>state.user)

const chatState=useSelector((state)=>state.chat)
const {id,Fullname,Username,avatarImage}=chatState.selectedChat;
const {socket}=useContext(Socketcontext)

useEffect(()=>{
    socket.emit("join-chat",{user:state.currentUser.Fullname,room:id})
    socket.on("online",(onlineUsers)=>{
        console.log(onlineUsers,"online")
    })
},[])
    return (
      <div className="flex flex-col flex-grow h-full">
          <div className="w-full p-1 rounded-bl-none rounded-br-none shadow-md h-15 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center p-2 align-middle">
                  <div className="p-2 mr-1 text-black rounded-full hover:bg-purple-500" onClick={()=>{navigate("/message")}}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                  </div>
                  <div className="border border-white rounded-full p-1/2">
                      <img className="rounded-full w-14 h-14" src={avatarImage} alt="avatar"/>
                  </div>
                  <div className="flex-grow p-2">
                      <div className="font-semibold text-md ">{Fullname} </div>
                      <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                          <div className="ml-1 text-xs">
                          Online
                          </div>
                      </div>
                  </div>
                  <div className="p-2 text-black rounded-full cursor-pointer hover:bg-purple-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                  </div>
              </div>
          </div>
          <div className="flex-grow w-full p-2 my-1 overflow-y-auto bg-gray-100 dark:bg-gray-900">
              
              <div className="flex items-end w-3/4">
                  <img className="w-8 h-8 m-3 rounded-full" src={avatarImage} alt="avatar"/>  
                  <div className="p-3 mx-3 my-1 bg-purple-300 rounded-bl-none dark:bg-gray-800 rounded-2xl sm:w-3/4 md:w-3/6">
                      <div className="hidden text-xs text-gray-100 dark:text-gray-200">
                          Rey Jhon A. Baqurin
                      </div>
                      <div className="text-gray-700 dark:text-gray-200">
                          gsegjsghjbdg bfb sbjbfsj fsksnf jsnfj snf nnfnsnfsnj
                      </div>
                      <div className="text-xs text-gray-400">
                          1 day ago
                      </div>
                  </div>
              </div>
              
              <div className="flex justify-end">
                  <div className="flex items-end w-auto m-1 bg-purple-500 rounded-br-none dark:bg-gray-800 rounded-xl sm:w-3/4 md:w-auto">
                      <div className="p-2">
                          <div className="text-gray-200">
                              Hello ? How Can i help you ?
                          </div>
                      </div>
                  </div>
              </div>
             
           
            
          </div>
          <div className="p-3 bg-gray-100 rounded-tl-none rounded-tr-none h-15 rounded-xl dark:bg-gray-800">
              <div className="flex items-center">
                  <div className="p-2 text-gray-600 dark:text-gray-200 ">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                  </div>
                  <div className="flex flex-grow p-2 ">
                      <input className="flex-grow p-5 text-sm text-gray-700 bg-gray-100 input dark:text-gray-200 focus:outline-none dark:bg-gray-800 rounded-l-md" type="text" placeholder="Type your message ..."/>
                      <div className="flex items-center justify-center pr-3 text-gray-400 bg-gray-100 dark:bg-gray-800 dark:text-gray-200 rounded-r-md">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
  
}
