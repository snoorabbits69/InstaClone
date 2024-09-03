import React from 'react'
import GetPosts from '../../hooks/GetPosts';
import { useNavigate } from 'react-router-dom';
export default function ProfilePost({id}) {
  const navigate=useNavigate();
      const {Post,Loading}=GetPosts(id);
    const images=Post?.posts?.map((post)=>{
      return {url:post.img[0],likes:post.likes.length,id:post._id}
    })
  
  return (
<>
           {
 Post &&
  images?.map((img,i)=>{
    console.log(img.id);
      return <div className="relative w-max h-28 lg:h-72" key={i} onClick={()=>{
      navigate(`/post/${img.id}`)
      }}>
      <img src={img.url} className="w-24 h-28 lg:w-[18rem] transition-all md:h-64 border-2 border-black peer hover:opacity-50 hover:cursor-pointer" />
      <div className="flex justify-center ">
        <p className="absolute top-0 transition-all opacity-100 text peer-hover:block">{img.likes}</p>
        </div>
    </div>
    
     })
}
   </>
  )
}
