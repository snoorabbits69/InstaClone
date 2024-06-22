import React, { useEffect, useState } from 'react'
import { SearchRoute } from '../../utils/ApiRoutes';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const navigate=useNavigate();
  const [Users,setUsers]=useState([]);
 const getUsers=async(e)=>{
  if(e.target.value){
  let apiroute=SearchRoute(e.target.value)
let {data}=await axios.get(apiroute);
setUsers(data.user);
  }
  else{
    setUsers([]);
  }
 }
  return (
    <div className="flex flex-col h-full gap-5 rounded-xl" >
<section>
  <input type="text" className='h-10 mt-12 sm:mx-8 w-80 rounded-xl' onChange={(e)=>{getUsers(e)}}/>
</section>

{Users.map((user)=>{
  return<button onClick={()=>{navigate(`/profile/${user.Username}`)}}> <div className="flex gap-3 pl-10 transition-all rounded-lg hover:bg-gray-500">
    <img src={user.avatarImage} className="w-10 h-10 mt-2 rounded-full"/>
    <section>
    <p className="">{user.Username}</p>
    <p className='text-sm'>{user.Fullname}</p>
    </section>
  </div>
  </button>
})}
    </div>
  )
}
