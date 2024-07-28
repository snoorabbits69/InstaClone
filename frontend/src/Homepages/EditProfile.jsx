import React from 'react'
import { useSelector } from 'react-redux'

export default function EditProfile() {
    const state=useSelector((state)=>state.user);

  return (
    <div>
     <section className="flex flex-col gap-2 ml-2 sm:ml-80">
  <h1 className="pt-5 font-bold sm:text-xl">Edit Profile</h1>
  <div className="flex  h-20 border-2 w-80 sm:w-[30rem]">
      <img src={state.currentUser.avatarImage} className="h-full p-3 rounded-full" alt="User Avatar" />
      <section className="pt-3">
        <p className="font-bold">{state.currentUser.Username}</p>
        <p className="text-sm">{state.currentUser.Fullname}</p>
      </section>
    <section className="pt-5 text-sm pl-14 sm:pl-48 sm:text-base">
      <button className='p-1 border-2'> Change Photo</button> 
        </section>
  </div>
</section>

        </div>
  )
}
