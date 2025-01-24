import React, { useState } from 'react'
import FollowButton from './FollowButton'
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import GetUser from './../hooks/GetUser';
import GetUserfromId from '../hooks/GetUserfromId';
const Userdata=({id,setModel})=>{
    const navigate=useNavigate();
    const {User,setUser}=GetUserfromId(id)

   return<>
   {User && <div key={User.Username} className="flex items-center gap-2 p-2 transition-all hover:shadow-lg">
                        <button className='flex items-center gap-2' onClick={() =>{ 
                           
                            setModel(false)
                        
                             navigate(`/profile/${User.Username}`)
                              }}>
                            <img src={User.avatarImage} className='w-12 h-12 rounded-full' alt={`${User.Username}'s avatar`} />
                            <section className="text-sm">
                                <p>{User.Username}</p>
                                <p>{User.Fullname}</p>
                            </section>
                        </button>
                        <section className="ml-auto">
                            <FollowButton currentUser={User} setcurrentUser={setUser} />
                        </section>
                    </div>
   }
   </>
}
export default function FollowersBox({ follower, text, setModel }) {
    const [localUsers, setLocalUsers] = useState(follower);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
            <div className="relative flex flex-col overflow-y-scroll bg-white border-2 rounded-md w-80 h-96">
                <button onClick={() => setModel(false)} className="absolute top-2 right-2">
                    <RxCross2 className="text-xl" />
                </button>
                <div className="flex-col pt-6">
               {localUsers.length > 0 ? localUsers.map((data,i) => (
              <Userdata key={i} id={data.id} setModel={setModel}/>
                )) : (
                    <p className="m-auto text-xl">{text}</p>
                )}
                </div>
            </div>
        </div>
    )
} 
