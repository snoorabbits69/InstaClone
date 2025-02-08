import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function ChatContent() {
    const state = useSelector((state) => state.user);
  const {messages}=useSelector((state)=>state.message)
  

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
                            {msg.isFile ? (<button>
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
                    </div>
                )
            ))}
        </>
    );
}
