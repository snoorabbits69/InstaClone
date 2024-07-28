import React from 'react'
import GetPosts from '../../hooks/GetPosts';
export default function ProfilePost({id}) {
      const {Post,Loading}=GetPosts(id);
      console.log(Post);
  return (
<>
           {
 Post &&
  Post.posts.map((post)=>{
     return post.img.map((imgUrl,i)=>{
      return <div className="relative w-auto h-28 lg:h-72 " key={post._id + i}>
      <img src={imgUrl} className="transition-all lg:h-72 peer hover:opacity-50" />
        <p className="absolute top-0 hidden transition-all opacity-100 text peer-hover:block">{post.likes.length}</p>
    </div>
    
     })
      }) 
    }
   </>
  )
}
