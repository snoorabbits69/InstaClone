import React, { useState } from 'react'
import { useRef } from 'react';
import { uploadRoute } from '../../utils/ApiRoutes';
import noProfile from "../assets/noprofile.png"
import { useDispatch, useSelector } from 'react-redux';
import {  UpdateAvatarImage } from '../Redux/Slice/Userslice';
import apiRequest from '../Components/axios';
import { useNavigate } from 'react-router-dom';

export default function SetProfile() {
    const [image,SetImage]=useState();
    let navigate=useNavigate()
    const state=useSelector((state)=>state.user);
const dispatch=useDispatch();
    const inputRef=useRef();
    const setAvatar=(event)=>{
      console.log(event.target.files)
        let file=event.target.files[0];
        SetImage(file);
       
    }
    const handleUpload=async()=>{
      if(image){
        const formdata=new FormData();
        formdata.append('file',image);
        console.log(formdata);
        const api=uploadRoute(state.currentUser._id)
     const data=await apiRequest('POST',api,formdata);
    console.log(data);
    if(data.status){
dispatch(UpdateAvatarImage(data.user.avatarImage));
window.location.href="/home";
    }
  }
    }
    image?console.log( URL.createObjectURL(image)):" ";
  return (
    <div className="fixed ml-96">
      <section className="grid justify-center mt-40 align-middle ">
        <h1 className="m-auto mb-2 text-3xl">Set Profile</h1>
      <label>
        <img
          src={image ? URL.createObjectURL(image) : noProfile}
          className="w-56 h-56 rounded-full"
          onChange={() => inputRef.current.click()}
          alt="Profile Image"
        />
        <input
          type="file"
          accept="image/*"
          onChange={setAvatar}
          style={{ display: 'none' }}
          ref={inputRef}
        />
      </label>
      <button onClick={()=>{navigate("/");}}>Not now</button>
      <button onClick={handleUpload}>Upload</button>
      </section>
    </div>
  )
}
