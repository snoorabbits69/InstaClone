import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import GetUserfromId from './../hooks/GetUserfromId';
import FollowButton from '../Components/FollowButton';

export default function Notifications() {
  const state=useSelector((state)=>state.user)
    let totalrequests = [];
  
    for (let req of state.currentUser.Account.Requests) {
      const { User } = GetUserfromId(req.id);
      totalrequests.push(User);
    }
console.log(totalrequests)
  return (
    <div className="w-screen h-full bg-red-500 md:w-80 ">
<section className="flex flex-col gap-2">
  {totalrequests?.map((req)=>{
    return <div className="flex pt-2">
      <img src={req?.avatarImage} className="w-12 rounded-full"/>
   <section className='ml-2'>
    <p className=''>{req?.Username}</p>
    <p className='text-sm'>{req?.Fullname}</p>
    </section>
    </div>
  })}
 
</section>
    </div>
  )
}
