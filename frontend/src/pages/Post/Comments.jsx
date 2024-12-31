//for comments in the post
import React from 'react'
import GetComments from '../../hooks/GetComments';

export default function 
Comments({postid}) {
    const {comments,loading} = GetComments(postid, 1);

    if(loading){
        return <section>Loading comments...</section>
    }
   
  return (
    <div>
        {comments.length>0?comments.map((comment,id)=>{
            return <div key={id}>{comment.text}</div>
        }):"No comments"}
    </div>
  )
}
