import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import GetPostsById from '../hooks/GetPostsById';
import PostImages from './../Homepages/Create Component/PostImages';
import GetUserfromId from './../hooks/GetUserfromId';
import Addcomment from '../Comment/Addcomment';
import Likes from './Post/Likes';
import Comments from './Post/Comments';
export default function Post() {
    const {postid}=useParams();
const {post,loading}=GetPostsById(postid);

const {User}=GetUserfromId(post?.postedBy)
let navigate=useNavigate()


return (
  <section className="flex flex-col w-screen h-screen pt-8 overflow-hidden mx-14 sm:pt-12 sm: sm:m-auto sm:flex-row">
    
   {/* Header for Avatar and Edit button on smaller screens */}
     <div className="flex items-center justify-between px-2 border-2 border-gray-500 border-b-1 sm:hidden w-80">
      <button onClick={()=>{
navigate(`/profile/${User.Username}`)
      }}>
        <img src={User?.avatarImage} alt="User Avatar" className="rounded-full w-14" />
      </button>
      <button className="text-blue-500">Edit</button>
    </div>

    {/* Post Images Section */}
    <div className="w-80 md:w-[30rem]  lg:ml-96">
      {!loading && <PostImages images={post.img}  forpost={true} />}
    </div>
  
    {/*for the bigger screens*/}
    <div className="relative mb-48 hidden px-2 sm:block  lg:h-[32.5rem] border-2 border-gray-500 sm:w-[20rem] lg:w-[25rem]">
      
      {/* Profile Section */}
      <section className="flex justify-evenly">
        <div className="absolute flex w-full border-b-2 border-gray-500 sm:relative">
          <button onClick={()=>{
            navigate(`/profile/${User.Username}`)
          }}>
            <img src={User?.avatarImage} className="p-2 rounded-full w-14" alt="User Avatar" />
          </button>
        </div>
        <button>Edit</button>
      </section>

      {/* Username and Avatar */}
      <div className="flex w-full mt-4=">
        <section>
          <img src={User?.avatarImage} className="p-2 rounded-full w-14" alt="User Avatar" />
        </section>
        <p className="mt-3">{User?.Username}</p>
      </div>

      {/* Likes and Comments */}
      <section className="absolute w-full pt-2 border-t-2 border-black bottom-10">
        <Likes />
      </section>

      <Comments postid={postid} />

      {/* Add Comment Section */}
      <section className="absolute bottom-0 w-full">
        <Addcomment postid={postid} />
      </section>
    </div>
    
  
  </section>
)
}
