import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export default function StoriesList() {
    const storyRef = useRef(null);
    
    const state = useSelector((state) => state.user);
    const navigate = useNavigate();
    const handleFileChange = (e) => {
   let file=e.target.files[0]
   if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
       sessionStorage.setItem("story",reader.result)
      navigate('/addtostory'); // Pass Base64 data
    };
    reader.readAsDataURL(file); 
  }
    };

    return (
        <button
            className='relative p-1 bg-blue-600 rounded-full'
            onClick={() => storyRef.current.click()}
            aria-label="Add story"
        >
            <img
                src={state.currentUser.avatarImage}
                alt="User Avatar"
                className='rounded-full w-14 h-14 md:w-20 md:h-20'
            />
            <div className='absolute text-2xl bg-white border-2 rounded-full left-8 top-8 md:left-14 md:top-14 z-12'>
                <IoIosAdd />
            </div>
            <input
                type="file"
                accept='image/*'
                className='hidden'
                ref={storyRef}
                onChange={handleFileChange}
            />
        </button>
    );
}
