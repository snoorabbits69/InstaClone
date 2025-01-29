import {useEffect, useState} from 'react';
import { getHomePagesRoute } from '../../utils/ApiRoutes';
import PostCard from './Post/PostCard';
import apiRequest from './../Components/axios';


export default function Home() {

let [page,setpage]=useState(1);
let [posts,setposts]=useState([])
 useEffect(()=>{

  let handlescroll=()=>{
    if(window.scrollY+window.innerHeight>document.body.offsetHeight-30){
      setpage((prev)=>prev+1);
        }
     }
     async function HomePosts() {
      try{
        console.log(getHomePagesRoute(page))
const data=await apiRequest('GET',getHomePagesRoute(page))
if(data.status){
  setposts((prev)=>[...prev,...data.Posts])
  console.log(data)
  console.log(posts)
}
      }catch(e){
        console.log(e)
      }
     }
     HomePosts()
     window.addEventListener("scroll",handlescroll)
     return ()=>window.removeEventListener("scroll",handlescroll)
 },[page])
 

    return (
      <div className="flex flex-col ml-2 item md:ml-96" >
   

{posts?.map((post,i)=>{
  return <PostCard post={post} key={i}/>
})}     


</div>
    );
}
