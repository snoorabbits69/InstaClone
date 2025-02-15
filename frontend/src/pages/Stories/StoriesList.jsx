import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import GetStories from '../../hooks/GetStories';
import { current } from '@reduxjs/toolkit';

export default function StoriesList() {
    const storyRef = useRef(null);
 const {Stories,Loading}=GetStories()
 console.log(Stories)

   
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
        <>
       <div className="relative">
    {/* First Button */}
    <button
        className='p-1 bg-blue-600 rounded-full'
        onClick={(e) => {
            if (
                Stories[0]?.postedBy._id === state.currentUser._id
            ) {
                navigate(`story/${Stories[0].stories[0]}`);
            } else {
                storyRef.current.click();
            }
        }}
        aria-label="Add story"
    >
        <img
            src={state.currentUser.avatarImage}
            alt="User Avatar"
            className='rounded-full w-14 h-14 md:w-20 md:h-20'
        />
       
    </button>
    <input
            type="file"
            accept='image/*'
            className='hidden'
            ref={storyRef}
            onChange={handleFileChange}
        />

    <button
        onClick={(e) => {
           
            if (Stories[0].postedBy._id === state.currentUser._id) {
                console.log(e.target)
                storyRef.current.click();
            }
        }}
        className='absolute z-20 text-2xl bg-white border-2 rounded-full left-8 top-8 md:left-14 md:top-14'
    >
        <IoIosAdd />
    </button>
</div>

         {
            Stories?.map((story,key)=>{
                if(story.postedBy._id!=state.currentUser._id){
                return <button
                className='relative p-1 bg-red-600 rounded-full'
                aria-label="Add story"
                key={key}
                onClick={()=>{
                    navigate(`story/${story.stories[0]}`);
                }}
            >
                 <img
                src={story.postedBy.avatarImage}
                alt="User Avatar"
                className='rounded-full w-14 h-14 md:w-20 md:h-20'
            />
                </button>
                }
            })
         }
        </>
    );
}
