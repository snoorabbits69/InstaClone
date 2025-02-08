import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AddUsers from './AddUsers';
export default function ChatInfo() {
    let navigate=useNavigate();
    const chatState=useSelector((state)=>state.chat);
    let [adduserdialog,setadduserdialog]=useState(false)
    const state=useSelector((state)=>state.user)
 
  return (
    <section className='absolute w-screen h-screen bg-white border-2 md:w-96 right-2'>
            <p className='mx-10 mt-12 text-xl' >Chat info</p>
            
            <p className='mx-10 mt-12 text-xl' >Users({chatState.selectedChat.users.length})</p>
        
            <div className='flex flex-col gap-6 overflow-y-scroll h-72'>
            {
                chatState.selectedChat.users.map((user)=>{
                    return<button className='z-50 flex gap-2 w-80'
                    onClick={()=>{
                     navigate(`/profile/${user.Username}`);
                    }} key={`${user.Username}`}> 
                    <div className="flex gap-3 pl-10 transition-all rounded-lg hover:bg-gray-200">
                     <img src={user.avatarImage} className="w-10 h-10 mt-2 rounded-full"/>
                     <section>
                     <p className="">{user.Username}</p>
                     <p className='text-lg'>{user.Fullname}</p>
                     </section>
                   </div>
                  {chatState.selectedChat.isGroupChat && <div className='px-4 py-2'>
                    {chatState.selectedChat.groupAdmin==user._id?"Admin":"Participant"}
                   </div>
                }
                   </button>
                }
                )
            }

             <dialog open={adduserdialog}   className="z-50 text-red-600 bg-white md:-translate-x-[40%] text-md" id="dialog">
            <AddUsers setadduserdialog={setadduserdialog} chatId={chatState.selectedChat._id}/>
            </dialog>
             </div>
            { (chatState.selectedChat.isGroupChat && chatState.selectedChat.groupAdmin==state.currentUser._id) && <button className='p-2 ml-10 border-2 rounded-full w-max' onClick={()=>{
            setadduserdialog(true)
          }}>Add users +</button> }
          </section> 
  )
}
