import React, { useEffect, useState } from 'react'
import PostImages from '../../Homepages/Create Component/PostImages'
import Likes from './Likes'
import { useNavigate } from 'react-router-dom'
export default function PostCard({loading,post,setcommentbox}) {
 const navigate=useNavigate()
 let [likes,setlikes]=useState()
    return (
        loading?"loading":
    <div className="flex flex-col w-[25rem] md:w-[30rem] " >
           
    <div className="p-4">
      <div className="max-w-md bg-white border rounded-sm dark:bg-gray-800 ">
       
        <div onClick={()=>{
          navigate(`/profile/${post.postedBy?.Username}`)
        }} className="flex items-center px-4 py-3">
          <img className="w-8 h-8 rounded-full" src={post?.postedBy?.avatarImage}/>
          <div className="ml-3 ">
            <span className="block text-sm antialiased font-semibold leading-tight">{loading?"":post.postedBy?.Username}</span>
            <span className="block text-xs text-gray-600">{post?.createdAt}</span>
          </div>
        </div>
        
        <div className="w-full " onDoubleClick={()=>{console.log('liked this post')}}>
        {!loading && <PostImages images={post.img}  forpost={true} />}
        </div>
        <div className='mx-4 mt-3 mb-2 '>
            {post.caption?post.caption:""}
            </div>
        <Likes post={post} setcommentbox={setcommentbox} />
        <div className="mx-4 mt-2 mb-4 text-sm font-semibold">{post?.likes?.length} likes</div>
      </div>
    </div>
    </div>
)
}

