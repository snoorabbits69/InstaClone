//for comments in the post
import React, { useEffect, useState } from 'react'
import GetComments from '../../hooks/GetComments';

export default function Comments({postid,page}) {
    const {comments,loading} = GetComments(postid, page);
const [Allcomments,setAllcomments]=useState([])
    useEffect(()=>{
        
setAllcomments((prev)=>[...prev,...comments])
    },[comments,page])

    if(loading){
        return <section>Loading comments...</section>
    }
   
  return (
    <div>
        {Allcomments.length>0?Allcomments.map((comment,id)=>{
            return <div className='mb-10' key={id}>{comment.text}</div>
        }):"No comments"}
    </div>
  )
}
