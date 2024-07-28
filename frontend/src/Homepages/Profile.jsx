import React, { useEffect } from 'react';

import FollowButton from '../Components/FollowButton';
import FollowersBox from '../Components/FollowersBox';
import GetUser from '../hooks/GetUser';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import GetPosts from '../hooks/GetPosts';
import ProfilePost from './Profile Component/ProfilePost';

export default function Profile() {
const {username}=useParams();

  const {currentUser,setcurrentUser}=GetUser(username);
const [modal,setModel]=useState(false);
  const [Userdata,setUserdata]=useState({
    user:[],
    text:""
  });
 
const ModalData=(index,txt)=>{
setModel(true); 
    setUserdata((follow)=>({...follow,user:currentUser[index],text:txt}));
  }



 

 if (!currentUser) {
    return "Loading";
}
  else{

  return (

<div className='ml-4 md:ml-72 lg:ml-96'>
    <div className="flex pt-10 pb-5 mb-20">
     {modal && <FollowersBox follower={Userdata.user} text={Userdata.text} setModel={setModel}/>}
      <img src={currentUser.avatarImage} className='p-1 border-2 border-red-500 border-solid rounded-full w-14 h-14 sm:w-40 sm:h-40' alt={`${currentUser.Username}'s avatar`} />
      <section className="flex flex-col gap-3 ml-8 ssm:ml-10 sm:gap-5 sm:mt-16">
        <div className="flex gap-2 sm:gap-5">
          <p className="sm:text-2xl">{currentUser.Username}</p>
          <FollowButton currentUser={currentUser} setcurrentUser={setcurrentUser}  />
        </div>
        <div className="flex gap-3 text-sm sm:gap-12">
          <p>{currentUser.Posts} Posts</p>
          <button onClick={()=>{ModalData("followersname","No followers")}}>{currentUser.followercount} Followers</button>
          <button onClick={()=>{ModalData("followingname","No following")}}>{currentUser.followingcount} Following</button>
        </div>
      </section>
    </div>
    <section className="sm:w-[75%] w-[90%] grid-cols-3 grid " >
 
    <ProfilePost id={currentUser._id}/>
   {/* <div className="w-auto bg-green-500 border-2 border-black h-28 lg:h-72"></div>
   <div className="w-auto bg-green-500 border-2 border-black h-28 lg:h-72"></div>
   <div className="w-auto bg-green-500 border-2 border-black h-28 lg:h-72"></div>
   <div className="w-auto bg-green-500 border-2 border-black h-28 lg:h-72"></div>
   <div className="w-auto bg-green-500 border-2 border-black h-28 lg:h-72"></div>
   <div className="w-auto bg-green-500 border-2 border-black h-28 lg:h-72"></div> */}
    </section>
    </div>
  );
}
}
