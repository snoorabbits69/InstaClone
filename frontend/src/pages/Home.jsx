import React ,{useEffect, useState} from 'react';
import PostImages from '../Homepages/Create Component/PostImages';
import axios from 'axios';
import { getHomePagesRoute } from '../../utils/ApiRoutes';
import PostCard from './Post/PostCard';


export default function Home() {
let images=["https://picsum.photos/id/244/900/900","https://picsum.photos/id/244/900/900","https://picsum.photos/id/244/900/900","https://picsum.photos/id/244/900/900","https://picsum.photos/id/244/900/900"]

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
const{data}=await axios.get(getHomePagesRoute(page),{withCredentials:true})
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
      <div className="flex flex-col md:ml-96" >
   

{posts?.map((post,i)=>{
  return <PostCard post={post} key={i}/>
})}     


</div>
    );
}
