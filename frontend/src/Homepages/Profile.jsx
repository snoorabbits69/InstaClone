import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AddFollowerRoute, RemoveFollowerRoute, getUserRoute } from '../../utils/ApiRoutes';
import axios from 'axios';
import HomeSidebar from './../Sidebar/HomeSidebar';
import { useSelector } from 'react-redux';

export default function Profile() {

    const {username}=useParams();
    const navigate=useNavigate();
    const state=useSelector((state)=>state.user);
    
    const [currentUser,setcurrentUser]=useState(null);
    useEffect(()=>{
    const getUserData = async () => {
        try {
          const { data } = await axios.get(getUserRoute(username));
          setcurrentUser(data.user);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }

      };
      getUserData();

    },[username]);
   
    const Controlfollower=async()=>{
      const addroute=AddFollowerRoute(currentUser._id);
      const removeroute=RemoveFollowerRoute(currentUser._id);
    if(currentUser.followersname?.some((follower)=>follower.id==state.currentUser._id)){
      const {data}=await axios.post(removeroute,{id:state.currentUser._id});
   setcurrentUser(data.user);
    }
    else{
     const {data}=await axios.post(addroute,{id:state.currentUser._id});
    setcurrentUser(data.user);
  }  
    }

    function Follower({currentUser}){
      return <div className="w-80 h-96 border-solid border-2 left-[50%] top-28 overflow-scroll absolute hidden">
<div className='text-center '>
{   
  currentUser.followersname.length>0?currentUser.followersname.map((follower)=>{
    return<button onClick={()=>{navigate(`/profile/${follower.Username}`)}}> <div className="flex gap-3 pl-4 transition-all rounded-lg hover:bg-gray-500">
    <img src={follower.avatarImage} className="w-10 h-10 mt-2 rounded-full"/>
    <section>
    <p className="">{follower.Username}</p>
    <p className='text-sm'>{follower.Fullname}</p>
    </section>
  </div>
  </button>
  }):"No followers"

}
</div>

      </div>
         }


  return (
   currentUser?(<>
   
   <Follower currentUser={currentUser} />
    <div className="flex">

    <img src={currentUser.avatarImage} className='my-10 ml-4 rounded-full w-14 h-14 sm:w-40 sm:h-40 md:ml-72 lg:ml-96'/>
  <section  className="flex flex-col gap-3 mt-8 ml-8 sm:ml-10 sm:gap-5 sm:mt-16 ">
   <div className="flex gap-2 sm:gap-5"> 
   <p className="sm:text-2xl"> {currentUser.Username}</p>
   {
   state.currentUser? <p className="px-2 py-1 text-sm border-2 border-solid ">
    {state.currentUser._id==currentUser._id?<button >Edit profile</button>:<button onClick={Controlfollower}>
{   currentUser?.followersname.some((follower)=>follower.id==state.currentUser._id)?"Following":"Follow"}</button>
    }</p>:""
    }
    </div>
   <div className="flex gap-3 text-sm sm:gap-12"> 
    <p>{currentUser.Posts} Posts</p>
    <button>{currentUser.followercount} Followers</button>
    <button>{currentUser.followingcount} Following</button>
    </div>
  
  </section>

  </div>
  </>):"Loading"
  )
}
