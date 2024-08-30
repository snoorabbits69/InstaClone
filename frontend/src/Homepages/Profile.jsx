import React, { useEffect } from 'react';

import FollowButton from '../Components/FollowButton';
import FollowersBox from '../Components/FollowersBox';
import GetUser from '../hooks/GetUser';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import GetPosts from '../hooks/GetPosts';
import ProfilePost from './Profile Component/ProfilePost';
import { useSelector } from 'react-redux';

export default function Profile() {
const {username}=useParams();
const state=useSelector((state)=>state.user)
  const {currentUser,setcurrentUser}=GetUser(username);
  const myfollower=currentUser?.followersname.some((follower)=>follower.id==state.currentUser?._id);
const myaccount=currentUser?._id===state.currentUser?._id;
const Private=currentUser?.Account.private && !myaccount;
const [modal,setModel]=useState(false);
  const [Userdata,setUserdata]=useState({
    user:[],
    text:""
  });
 
const ModalData=(index,txt)=>{
  if(!Private){
setModel(true); 
    setUserdata((follow)=>({...follow,user:currentUser[index],text:txt}));
  }
  }



 

 if (!currentUser) {
    return "Loading";
}
  else{

  return (

<div className='ml-4 lg:ml-72 lg:ml-96'>
    <div className="flex pt-10 pb-5 mb-20">
     {modal && <FollowersBox follower={Userdata.user} text={Userdata.text} setModel={setModel}/>}
      <img src={currentUser.avatarImage} className='p-1 border-2 border-red-500 border-solid rounded-full w-14 h-14 lg:w-40 lg:h-40' alt={`${currentUser.Username}'s avatar`} />
      <section className="flex flex-col gap-3 ml-8 lg:ml-10 lg:gap-5 lg:mt-16">
        <div className="flex gap-2 lg:gap-5">
          <p className="lg:text-2xl">{currentUser.Username}</p>
    {state.currentUser &&  <FollowButton currentUser={currentUser} setcurrentUser={setcurrentUser}  />}
        </div>
        <div className="flex gap-3 text-sm lg:text-lg lg:gap-12">
          <p>{currentUser.Posts} Posts</p>
          <button onClick={()=>{ModalData("followersname","No followers")}}>{currentUser.followercount} Followers</button>
          <button onClick={()=>{ModalData("followingname","No following")}}>{currentUser.followingcount} Following</button>
        </div>
      </section>
    </div>
    {Private?"Private":
    <section className="lg:w-[75%] w-[90%] grid-cols-3 grid gap-2 " >
 
    <ProfilePost id={currentUser._id}/>
   {/* <div className="w-auto bg-green-500 border-2 border-black h-28 lg:h-72"></div>
   <div className="w-auto bg-green-500 border-2 border-black h-28 lg:h-72"></div>
   <div className="w-auto bg-green-500 border-2 border-black h-28 lg:h-72"></div>
   <div className="w-auto bg-green-500 border-2 border-black h-28 lg:h-72"></div>
   <div className="w-auto bg-green-500 border-2 border-black h-28 lg:h-72"></div>
   <div className="w-auto bg-green-500 border-2 border-black h-28 lg:h-72"></div> */}
    </section>
  }
    </div>
  );
}
}
