//for comments in the post
import React, { useEffect, useState } from 'react'
import GetComments from '../../hooks/GetComments';

export default function Comments({postid}) {
    const {comments,loading} = GetComments(postid, 1);
const [Allcomments,setAllcomments]=useState([])
    useEffect(()=>{
setAllcomments(comments)
    },[comments])

    if(loading){
        return <section>Loading comments...</section>
    }
   
  return (
    <div>
        {Allcomments.length>0?Allcomments.map((comment,id)=>{
            return <div key={id}>{comment.text}</div>
        }):"No comments"}
    </div>
  )
}
