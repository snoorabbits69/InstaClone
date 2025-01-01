import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Mychats from './Mychats';
import ChatBox from './ChatBox';
import Search from '../Search';
import { setUser } from '../../Redux/Slice/ChatSlice';




export default function Message() {
  const state = useSelector((state) => state.user);
  let dispatch=useDispatch();
useEffect(()=>{
dispatch(setUser(state.currentUser))
},[])


  return (
    <div className="">
    <div className="flex lg:ml-20 ">
      
        <div className="hidden h-screen p-2 border-r-2 w-80 dark:bg-gray-800 md:block">
            <div className="h-full overflow-y-auto">
                <div className="p-3 text-xl font-extrabold text-gray-600 dark:text-gray-200">InstaClone</div>
                <div className="flex p-3 search-chat">
                    <input className="w-full p-3 text-sm text-gray-700 bg-gray-200 input dark:text-gray-200 focus:outline-none dark:bg-gray-700 rounded-l-md" type="text" placeholder="Search Messages"/>
                    <div className="flex items-center justify-center pr-3 text-gray-400 bg-gray-200 dark:bg-gray-700 rounded-r-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
                <button className="p-3 text-lg text-gray-600 border-2 rounded-full font-semibol dark:text-gray-200">Add Group +</button>
              <Mychats/>
            </div>
        </div>               
        <div className="flex-grow h-screen p-2 rounded-md">
            <ChatBox/>
        </div>
    </div>
</div>
)


}
