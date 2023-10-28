import React, { useState } from 'react'
import axios from 'axios';
import { useRef } from 'react';
import { uploadRoute } from '../../utils/ApiRoutes';
import noProfile from "../assets/noprofile.png"
export default function SetProfile() {
    const [image,SetImage]=useState();
    const inputRef=useRef();
    const setAvatar=(event)=>{
        let file=event.target.files[0];
        SetImage(file);
       
    }
    const handleUpload=async()=>{
        const formdata=new FormData();
        formdata.append('file',image);
        console.log(formdata);
     const {data}=   await axios.post(uploadRoute,formdata)
    console.log(data);
    }
    image?console.log( URL.createObjectURL(image)):" ";
  return (
    <div>
      <label>
        <img
          src={image ? URL.createObjectURL(image) : noProfile}
          className="rounded-full w-56 h-56"
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
      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}
