import axios from 'axios';
import React, { useEffect,  useState } from 'react';
import { FiHeart } from "react-icons/fi";
import { IoChatboxOutline } from "react-icons/io5";
import { FaHeart } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { LikePostRoute,SavePostRoute } from '../../../utils/ApiRoutes';
import apiRequest from '../../Components/axios';
import { useNavigate,useLocation } from 'react-router-dom';
import { FaRegBookmark } from 'react-icons/fa';
import { FaBookmark,FaRegComment } from 'react-icons/fa6';
export default function Likes({ post, setcommentbox }) {
  let [saved,setsaved]=useState(false)
  if(window.location.pathname.includes("post")){
  const location = useLocation();
  const fromHome = location.state?.fromHome;
  useEffect(()=>{
    if(fromHome){
setcommentbox(true)
    }
  },[])
}
  let navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(post.likes?.includes(currentUser._id));
   
  }, [post, currentUser._id]);

  const handleLike = async () => {
    try {
      const data = await apiRequest('POST', LikePostRoute(post._id));
      console.log(data);
      setIsLiked(!isLiked); // Toggle the like status
    } catch (error) {
      console.error("Error while liking the post", error);
    }
  };

  return (
    <div className="flex items-center justify-between mx-4 mt-3 mb-2 ">
      <div className="flex gap-5">
        <button
          title="Like"
          onClick={handleLike}
        >
          {isLiked ? <FaHeart className='text-2xl' /> : <FiHeart className='text-2xl' />}
        </button>
        <button id="comment" onClick={()=>{
  if(window.location.pathname.includes("post")){
    setcommentbox((prev)=>!prev)
  }
  else{
    navigate(`post/${post._id}`,{state: { fromHome: window.location.pathname === "/" }})
  }
   }} className="text-2xl" style={{transform: "scaleX(-1)"}}>
      <FaRegComment/>
      </button> 
        {/* <button onClick={() => {
          console.log(window.location+"post/"+post._id);
        }} id="share">
          <svg fill="#262626" height="25" viewBox="0 0 48 48" width="22">
            <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
          </svg>
        </button> */}
      </div>
      <button className="flex text-2xl" id="save" onClick={async()=>{
       setsaved(!saved)
       let data=await apiRequest("POST",SavePostRoute,{postid:post._id})
       console.log(data)
      }}>
       { saved?<FaBookmark/>:<FaRegBookmark/>}
     
      </button>
    </div>
  );
}




  
  
