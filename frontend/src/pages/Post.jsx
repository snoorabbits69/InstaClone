import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import GetPostsById from '../hooks/GetPostsById';
import PostImages from './../Homepages/Create Component/PostImages';
import GetUserfromId from './../hooks/GetUserfromId';
import Addcomment from '../Comment/Addcomment';

export default function Post() {
  const navigate=useNavigate()
    const {postid}=useParams();
const {post,loading}=GetPostsById(postid);
const {User}=GetUserfromId(post?.postedBy)

console.log(User);

  return (
<section className="flex w-screen h-screen overflow-hidden ">
    <div className=' w-80 md:w-[35rem] ml-7  md:ml-20 mt-8 lg:mt-20 lg:ml-96  '>
    { !loading &&  <PostImages images={post.img} width={35} forpost={true}/>}
    </div>
   <div className="relative mt-20 h-[32.5rem]  border-l-2 border-white   w-[25rem]    ">
    <section className="flex justify-evenly">
    <div className="flex w-full pr-4 border-b-2 border-white">
      <section>
      <img src={User?.avatarImage} className="p-2 rounded-full w-14"/>
      </section>
    </div>
      <button className="">Edit</button>
 
    </section>
    <div>
   
    </div>
    <section className="absolute bottom-0 w-full">
    <Addcomment postid={postid} />
    </section>
    </div>
    </section>
  )
}
