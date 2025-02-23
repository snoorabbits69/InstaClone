import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function ChatContent() {
    const state = useSelector((state) => state.user);
  const {messages}=useSelector((state)=>state.message)
  let [fullimg,setfullimg]=useState()
  

    return (
      
        <>
            {messages?.map((msg, i) => (
                msg.Sender._id !== state.currentUser._id ? (
                    <div className="flex items-end w-3/4" key={i}>
                        <img className="w-8 h-8 m-3 rounded-full" src={msg.Sender.avatarImage} alt="avatar" />
                        <div className="p-3 mx-3 my-1 bg-purple-300 rounded-bl-none dark:bg-gray-800 rounded-2xl sm:w-3/4 md:w-3/6">
                            <div className="hidden text-xs text-gray-100 dark:text-gray-200">
                                {msg.Sender.Username}
                            </div>
                            {msg.isFile ? (<button onClick={()=>{
                                console.log(msg)
                                setfullimg(msg.content)
                            }}>
                                <img src={msg.content} className="w-64 h-28" />
                                </button>
                            ) : (
                            <div className="text-gray-700 dark:text-gray-200">
                                {msg.content}
                            </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-end" key={i}>
                        <div className="flex items-end w-auto m-1 bg-purple-500 rounded-br-none dark:bg-gray-800 rounded-xl sm:w-3/4 md:w-auto">
                            {msg.isFile ? (<button>
                                <img src={msg.content} className="w-64 h-28" />
                                </button>
                            ) : (
                                <div className="p-2">
                                    <div className="text-gray-200">
                                        {msg.content}
                                    </div>
                                </div>
                            )}
                            
                        </div>
                        <button
          className="z-50 p-2 text-black rounded-full cursor-pointer hover:bg-blue-100"
          onClick={() => {
           console.log("options")
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
                    </div>
                )
            ))}
            
         {fullimg &&   <div className="fixed flex justify-center   align-center w-screen h-screen bg-gray-200  left-2 top-1 z-[54]">
               <img className='h-full w-96' src={fullimg} />

        
               <button className="fixed right-2" onClick={()=>{
                setfullimg()
               }}>close</button>
                </div>
}
        </>
    );
}
