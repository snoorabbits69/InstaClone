
import FollowButton from '../../Components/FollowButton';
import FollowersBox from '../../Components/FollowersBox';
import GetUser from '../../hooks/GetUser';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfilePost from './ProfilePost';
import { useDispatch, useSelector } from 'react-redux';
import { AccessChatRoutes } from '../../../utils/ApiRoutes';
import { chatStart } from '../../Redux/Slice/ChatSlice';
import apiRequest from './../../Components/axios';


export default function Profile() {
const {username}=useParams();
const state=useSelector((state)=>state.user)
const dispatch=useDispatch();
const navigate=useNavigate()
  const {currentUser,setcurrentUser}=GetUser(username);
const myaccount=currentUser?._id==state.currentUser?._id;
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

<div className='ml-4 md:ml-72 lg:ml-96'>
    <div className="flex pt-10 pb-5 mb-20 ">
     {modal && <FollowersBox follower={Userdata.user} text={Userdata.text} setModel={setModel}/>}
      <img src={currentUser.avatarImage} className='p-1 border-2 border-solid rounded-full w-14 h-14 lg:w-40 lg:h-40' alt={`${currentUser.Username}'s avatar`} />
      <section className="flex flex-col gap-3 ml-8 lg:ml-10 lg:gap-5 lg:mt-16">
        <div className="flex gap-2 lg:gap-5">
          <p className="lg:text-2xl">{currentUser.Username}</p>
    {state.currentUser &&  <FollowButton currentUser={currentUser} setcurrentUser={setcurrentUser}  />}
   { (!myaccount && !currentUser.Account?.private ) && <button className="px-2 py-1 bg-blue-400 border-2" onClick={ async()=>{
const data=await apiRequest('POST',AccessChatRoutes,{Userid:currentUser._id})


dispatch(chatStart(data))

navigate(`/message/${currentUser?.Username}`)
   }}>message</button>}
        </div>
        <div className="z-50 flex gap-3 text-sm lg:text-lg lg:gap-12">
          <p>{currentUser.Posts} Posts</p>
          <button onClick={()=>{ModalData("followersname","No followers")}}>{currentUser.followercount} Followers</button>
          <button onClick={()=>{ModalData("followingname","No following")}}>{currentUser.followingcount} Following</button>
        </div>
      </section>
    </div>
    {Private?"Private":
    <section className="lg:w-[75%] w-72    grid-cols-3 grid  " >
 
    <ProfilePost id={currentUser._id}/>
  
    </section>
  }
    </div>
  );
}
}
