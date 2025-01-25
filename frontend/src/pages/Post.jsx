import  { useEffect, useState,useRef } from 'react'
import {useParams } from 'react-router-dom'
import GetPostsById from '../hooks/GetPostsById';
import Comments from './Post/Comments';
import PostCard from './Post/PostCard';
import gsap from 'gsap';
export default function Post() {
    const {postid}=useParams();
const {post,loading}=GetPostsById(postid);
let [commentbox,setcommentbox]=useState(false)

let scrollcontainerref=useRef(null);
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

return(
   <div className="relative flex">

<div className="relative  w-max md:w-[30rem] md:ml-96 "> 
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


