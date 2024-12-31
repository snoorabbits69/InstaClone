import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRef, useState } from 'react'
import { uploadRoute } from '../../../utils/ApiRoutes';
import { RemoveProfilePicRoute } from '../../../utils/ApiRoutes';
import axios from 'axios';
import { UpdateAvatarImage } from '../../Redux/Slice/Userslice';
import Togglebutton from './Tooglebutton';
import Darkmode from './Darkmode';
export default function EditProfile() {
    const state=useSelector((state)=>state.user);
    let dispatch=useDispatch();
    const handleUpload=async(e)=>{
      if(e.target.files[0]){
        const formdata=new FormData();
        formdata.append('file',e.target.files[0]);
        console.log(formdata);
        const api=uploadRoute(state.currentUser._id)
     const {data}=await axios.post(api,formdata);
    console.log(data);
    if(data.status){
      dispatch(UpdateAvatarImage(data.user.avatarImage));

    }
  }
    }
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
handleUpload(e)
   }}/>
   <dialog className=" absolute translate-x-[-50%] " ref={dialogref}>
    <div className="flex flex-col border-2 dialog rounded-xl">
      <p className="p-4 px-32 text-xl text-center border-b-2 ">Edit Profile</p>
<button className='p-4 border-b-2' onClick={()=>{inputref.current.click()}}>Upload Photo</button>
<button className='p-4 border-b-2' onClick={async()=>{
  let removepic=RemoveProfilePicRoute(state.currentUser._id);
  const {data}=await axios.delete(removepic)
  console.log(data);
}}> Remove</button>
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

<div className="w-full h-20 p-4 ">
  <label htmlFor="username" >
    Username:
  </label>
  <input
    type="text"
    id="username"
    className="w-full h-full border-2 border-gray-600 border-solid peer"
    defaultValue={state?.currentUser?.Username}
   
  />

</div>

<div className="w-full h-20 p-4 mt-4">
  <label htmlFor="fullname" >
Fullname:
  </label>
  <input
    type="text"
    id="username"
    className="w-full h-full border-2 border-gray-600 border-solid peer"
    defaultValue={state?.currentUser?.Fullname}
  />

</div>

<div className="flex w-full gap-4 p-3 mt-5 ">
<p className="pt-2 w-max" >Password:</p>
 
<button className="p-2 border-2 rounded-2xl">Update</button>
</div>
<div className="flex p-2">
  Private Mode:<Togglebutton/>
</div>
<div className='flex pl-3'>
  <p className="pt-3">DarkMode:</p>
<Darkmode/>
  
</div>

<div className='flex gap-[80%] w-full pl-4 pr-4 '>
  <button >Save</button>
  <button className="justify-self-end">Cancel</button>
</div>

</section>

        </div>
  )
}
