import React, { useEffect, useState } from 'react'
import axios from 'axios';
import  {GetPostfromIdRoute} from "../../utils/ApiRoutes"
import apiRequest from '../Components/axios';
export default function GetPostsById(postid) {
    let [post,setpost]=useState([]);
    let [loading,setloading]=useState(true);
    useEffect(()=>{
        const route= GetPostfromIdRoute(postid);
        
const getPost=async()=>{

const data=await apiRequest('GET',route)
if(data.post){
    setpost(data.post);
    setloading(false)
} 
}
getPost();
    },[postid])
 return {post,loading};
}
