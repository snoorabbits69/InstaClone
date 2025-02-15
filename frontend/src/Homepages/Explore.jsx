import { useEffect,useState} from 'react';
import { getHomePagesRoute } from '../../utils/ApiRoutes';
import apiRequest from '../Components/axios';
import Search from './Search';
import { useNavigate } from 'react-router-dom';
export default function Explore() {
  let [page,setpage]=useState(1);
let [posts,setposts]=useState([])
const navigate=useNavigate()
 useEffect(()=>{

  let handlescroll=()=>{
    if(window.scrollY+window.innerHeight>document.body.offsetHeight-30){
      setpage((prev)=>prev+1);
        }
     }
     async function ExplorePosts() {
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
     ExplorePosts()
     window.addEventListener("scroll",handlescroll)
     return ()=>window.removeEventListener("scroll",handlescroll)
 },[page])
 console.log(posts)

  return (
   <section className="flex-col lg:flex lg:mx-96">
    <div className="absolute left-[50%] -top-5 lg:hidden translate-x-[-50%]" >

    <Search/>
    </div>
<div className="grid grid-cols-3 gap-1 mt-20 lg:mt-5">
{posts.map((post, i) => (
    <button onClick={()=>{
      navigate(`/post/${post._id}`)
    }}
      className={`${
        (i+1) % 3 === 0 ? 'row-span-2 h-auto' : 'h-32 sm:h-64'
      } w-full  border-2  `}
      key={i}
    >
      <img 
        className="w-full h-full "
        src={post.img[0]}
        alt="Post"
      />
    </button>
  ))}
  {/* <p className='w-auto h-32 bg-blue-500 sm:h-64 '></p>
  <p className='w-auto h-32 bg-green-600 sm:h-64'></p>
  <p className="w-auto h-auto row-span-2 bg-red-400 border-2 "></p>
  <p className='w-auto h-32 bg-yellow-300 sm:h-64'></p>
  <p className='w-auto h-32 bg-blue-200 sm:h-64'></p>
  
  <p className='w-auto h-auto row-span-2 bg-yellow-500 '></p>
  <p className='w-auto h-32 bg-blue-500 sm:h-64 '></p>
  <p className='w-auto h-32 bg-green-600 sm:h-64'></p>
  <p className='w-auto h-32 bg-blue-200 sm:h-64'></p>
  <p className="w-auto bg-red-400 "></p>

  <p className='w-auto h-32 bg-blue-500 sm:h-64 '></p>
  <p className='w-auto h-32 bg-green-600 sm:h-64'></p>
  <p className="w-auto h-auto row-span-2 bg-red-400 border-2 "></p>
  <p className='w-auto h-32 bg-yellow-300 sm:h-64'></p>
  <p className='w-auto h-32 bg-blue-200 sm:h-64'></p>
  
   */}
</div>
   </section>
  )
}
