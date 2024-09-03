import React from 'react'
import { useSelector } from 'react-redux'
import Darkmode from './Darkmode.json'
import Lottie from 'lottie-react';
import { useRef, useState } from 'react'
import SetProfile from './../../pages/SetProfile';
export default function EditProfile() {
    const state=useSelector((state)=>state.user);
    const [updatedimage,setupdatedimage]=useState(null);

const Lottieref=useRef();
let inputref=useRef();
let dialogref=useRef();
  return (

      
    <div className='flex flex-col gap-2 ml-2 md:ml-10 lg:ml-80' onClick={(e)=>{
      if (e.target.parentElement.classList.contains('dialog') ) {
        return;
    } else if(e.target.classList.contains('change')) {
    return;
    }
    else{
   dialogref.current.close();
    }

    }}>
   <input type="file" accept="image/png, image/gif, image/jpeg" className="hidden" ref={inputref} onChange={(e)=>{
setupdatedimage(e.target.files[0])
   }}/>
   <dialog className=" absolute translate-x-[-50%] " ref={dialogref}>
    <div className="flex flex-col border-2 dialog rounded-xl">
      <p className="p-4 px-32 text-xl text-center border-b-2 ">Edit Profile</p>
<button className='p-4 border-b-2'>Upload Photo</button>
<button className='p-4 border-b-2'> Remove</button>
<button className='p-4 border-b-2 ' onClick={()=>{
  console.log("cancel");
  dialogref.current.close();
}}> Cancel</button>
    </div>
   </dialog>
  <h1 className="pt-5 pb-2 font-bold sm:text-xl">Edit Profile</h1>
     <section className="flex flex-col p-4 border-2 w-max">
  
  <div className="flex   h-20   w-80 sm:w-[30rem]">
      <img src={state.currentUser.avatarImage} className="h-full p-3 rounded-full" alt="User Avatar" />
      <section className="pt-2">
        <p className="font-bold ">{state.currentUser.Username}</p>
        <p className="text-sm">{state.currentUser.Fullname}</p>
      </section>
    <section className="pt-5 text-sm pl-14 sm:pl-48 sm:text-base">
      <button className='p-1 border-2 change' onClick={()=>{dialogref.current.showModal()}}> Change Photo</button> 
        </section>
  </div>

<div className="w-full h-20 p-4">
  <label>
    Username:
  <input type="text" className="w-full h-full" defaultValue={state?.currentUser.Username}/>
  </label>
</div>

<div className="w-full h-20 p-4 mb-2">
  <label>
    Fullname:
  <input type="text" className="w-full h-full" defaultValue={state?.currentUser.Fullname}/>
  </label>
</div>

<div className="flex w-full gap-4 p-3 ">
<p className="pt-2 w-max" >Password:</p>
 
<button className="p-2 border-2 rounded-2xl">Update</button>
</div>
<div className='flex pb-3 pl-3'>
  <p className="pt-3">DarkMode:</p>
  <div className="relative w-24 bottom-5" onClick={()=>{
    Lottieref.current.setSpeed(1);
    Lottieref.current.playSegments([0,100],false);
Lottieref.current.stop();
  }}><Lottie animationData={Darkmode} autoplay={false} lottieRef={Lottieref}></Lottie></div>
</div>
<div className='flex gap-[80%] w-full pl-4 pr-4 '>
  <button >Save</button>
  <button className="justify-self-end">Cancel</button>
</div>

</section>

        </div>
  )
}
