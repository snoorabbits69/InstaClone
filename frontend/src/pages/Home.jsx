import {useEffect, useState} from 'react';
import { getHomePagesRoute } from '../../utils/ApiRoutes';
import PostCard from './Post/PostCard';
import apiRequest from './../Components/axios';
import StoriesList from './Stories/StoriesList';
import { Link } from 'react-router-dom';
import { BiHeart } from 'react-icons/bi';
export default function Home() {

let [page,setpage]=useState(1);
let [posts,setposts]=useState([])

 useEffect(()=>{

  let handlescroll=()=>{
    if(window.scrollY+window.innerHeight>body.offsetHeight-30){
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
      <div className="flex flex-col overflow-hidden dark:bg-black item lg:ml-96 " >
   
  <section className="ml-2 relative overflow-hidden  w-[22rem] md:w-[27rem]">
<section className="flex gap-2 overflow-hidden w-max">
  <StoriesList/>
</section>
</section>
{posts?.map((post,i)=>{
  return <PostCard post={post} key={i}/>
})}     
<Link to="/notifications" className="fixed text-3xl right-5 top-4 md:hidden">
<BiHeart className="mb-5 mr-3" />
</Link>

</div>
    );
}
