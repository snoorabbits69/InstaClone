import React, { useEffect } from 'react';


export default function Mychat({avatarImage,Fullname,Username}) {
console.log(avatarImage,Fullname,Username)
  

  return (
    <div>
        <div className={'conversation-item p-1 dark:bg-gray-700 hover:bg-gray-200 m-1 rounded-md '} >
            <div className={'flex items-center p-2  cursor-pointer  '}>
                <div className="m-1 w-7 h-7">
                    <img className="rounded-full" src={avatarImage} alt="avatar"/>
                </div>
                <div className="flex-grow p-2">
                    <div className="flex justify-between text-md ">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-200">{Username}</div>
                        <div className="text-xs text-gray-400 dark:text-gray-300">time</div>
                    </div>
                    <div className="w-40 text-sm text-gray-500 truncate dark:text-gray-400">
                   message
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}
