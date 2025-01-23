import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import GetPostsById from '../hooks/GetPostsById';
import PostImages from './../Homepages/Create Component/PostImages';
import GetUserfromId from './../hooks/GetUserfromId';
import Addcomment from '../Comment/Addcomment';
import Likes from './Post/Likes';
import Comments from './Post/Comments';
import PostCard from './Post/PostCard';
import gsap from 'gsap';
export default function Post() {
    const {postid}=useParams();
const {post,loading}=GetPostsById(postid);
let [commentbox,setcommentbox]=useState(false)
const {User}=GetUserfromId(post?.postedBy)
let [page,setpage]=useState(1)
let navigate=useNavigate()
console.log(commentbox,setcommentbox)
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
 <div className='w-full overflow-hidden overflow-y-scroll border-2 h-[80%]' onScroll={(e)=>{
  const {scrollTop,scrollHeight,clientHeight}=e.target;
  if (scrollHeight - scrollTop <= clientHeight + 50) {
 setpage(page++)
  }
 }}>
    <Comments postid={post._id} page={page} />
    </div>

    <Addcomment postid={post._id}/>
  </div>
</div>


    </div>
)
}


