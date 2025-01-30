import  { useEffect, useState,useRef } from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import GetPostsById from '../hooks/GetPostsById';
import Comments from './Post/Comments';
import PostCard from './Post/PostCard';
import gsap from 'gsap';
import { useDispatch, useSelector } from 'react-redux';
import { resetcomment } from '../Redux/Slice/CommentSlice';
import apiRequest from '../Components/axios';
import { DeletePostRoute } from '../../utils/ApiRoutes';
export default function Post() {
    const {postid}=useParams();
    const {currentUser}=useSelector((state)=>state.user)
   let navigate=useNavigate()
const {post,loading}=GetPostsById(postid);

let [commentbox,setcommentbox]=useState(false)
let dispatch=useDispatch();
let scrollcontainerref=useRef(null);
useEffect(()=>{
 if( window.location.pathname.startsWith("/post/") ){
dispatch(resetcomment())
  }
},[dispatch])
useEffect(() => {
    const tl = gsap.timeline();

    if (commentbox) {
      tl.to('#commentbox', { y: 650 })
        .to('#commentbox', { display: 'block', y: 0, height: 'auto' });
    } else {
        tl .to('#commentbox', { height:0,y: 650,delay:0.2  },'s').to('#commentbox', {display:'none'  },'s')

    }

    return () => {
      tl.kill(); 
    };
  }, [commentbox]);
if(loading){
return <div>loading</div>
}
else{
return(
   <div className="relative flex">

<div className="relative  w-max md:w-[30rem] md:ml-96 "> 
 {currentUser._id==post.postedBy._id && <button className='absolute right-6 top-8' onClick={async()=>{
const data=await apiRequest('DELETE',DeletePostRoute(post._id))
if(data.status){
  navigate(`/profile/${post.postedBy.Username}`)
}
 }}>delete</button>}

  <PostCard loading={loading} post={post} setcommentbox={setcommentbox} />
  <div className="absolute inset-0 hidden h-0 p-2 bg-white border-2 border-black " id='commentbox'>
    <button className='fixed right-0 mr-2 ' onClick={()=>{
        setcommentbox(false)
    }} >close</button>
   <h1 className='mt-5 overflow-scroll text-center '> Comments:</h1>
 <div className='w-full overflow-hidden overflow-y-scroll  h-[75%]' ref={scrollcontainerref}>
    <Comments postid={postid}  parentref={scrollcontainerref} />
    </div>

   
  </div>
</div>


    </div>
)
}
}


