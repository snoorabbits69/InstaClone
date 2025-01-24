import  { useEffect, useState } from 'react'
import  {GetPostfromIdRoute} from "../../utils/ApiRoutes"
import apiRequest from '../Components/axios';
export default function GetPostsById(postid) {
    let [post,setpost]=useState([]);
    let [loading,setloading]=useState(true);
    useEffect(()=>{
        const route= GetPostfromIdRoute(postid);
        
const getPost=async()=>{

const data=await apiRequest('GET',route)
console.log(route,data)
if(data.post){
    setpost(data.post);
    setloading(false)
} 
}
getPost();
    },[postid])
 return {post,loading};
}
