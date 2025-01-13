import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { FiHeart } from "react-icons/fi";
import { IoChatboxOutline } from "react-icons/io5";
import { FaHeart } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { LikePostRoute } from '../../../utils/ApiRoutes';

export default function Likes({ post,setcommentbox }) {
  const { currentUser } = useSelector((state) => state.user);

  const [isLiked, setIsLiked] = useState(false);
useMemo(()=>{
setIsLiked(post.likes?.includes(currentUser._id))
},[post])
  const handleLike = async () => {
    try {
      const { data } = await axios.post(LikePostRoute(post._id));
      console.log(data);
      setIsLiked(!isLiked); 
    } catch (error) {
      console.error("Error liking the post:", error);
     
    }
  };

return(

  <div className="flex items-center justify-between mx-4 mt-3 mb-2">
      <div className="flex gap-5">
      <button
        title="Like"
        className=""
        onClick={handleLike}
      >
      {isLiked ? <FaHeart className='text-2xl'/> : <FiHeart className='text-2xl' />}
      </button>
     <button onClick={()=>{
      setcommentbox((prev)=>!prev)
     }}>
        <svg fill="#262626" height="22" viewBox="0 0 48 48" width="22"><path clipRule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path></svg>
        </button> 
        <button onClick={()=>{
          console.log(window.location)
        }}>
        <svg fill="#262626" height="25" viewBox="0 0 48 48" width="22"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg>
        </button>
      </div>
      <div className="flex">
        <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path></svg>
      </div>
    </div>
)



}
  // return (
  //   <div className="flex flex-row gap-2 p-4 text-3xl">
  //     <button
  //       title="Like"
  //       className=""
  //       onClick={handleLike}
  //     >
  //       {isLiked ? <FaHeart /> : <FiHeart />}
  //     </button>
  //     <button title="Comment">
  //       <IoChatboxOutline />
  //     </button>
  //   </div>
  // );

