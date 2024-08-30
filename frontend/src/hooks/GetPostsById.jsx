import React, { useEffect, useState } from 'react'
import axios from 'axios';
import  {GetPostfromIdRoute} from "../../utils/ApiRoutes"
export default function GetPostsById(postid) {
    let [post,setpost]=useState([]);
    let [loading,setloading]=useState(true);
    useEffect(()=>{
        const route= GetPostfromIdRoute(postid);
        
const getPost=async()=>{
    try{
const {data}=await axios.get(route,{ withCredentials: true });
if(data.post){
    setpost(data.post);
    setloading(false)
}
    }
    catch(e){
        console.error(e);
    }
}
getPost();
    },[postid])
 return {post,loading};
}
