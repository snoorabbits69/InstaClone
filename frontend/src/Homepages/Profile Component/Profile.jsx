
import FollowButton from '../../Components/FollowButton';
import FollowersBox from '../../Components/FollowersBox';
import GetUser from '../../hooks/GetUser';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfilePost from './ProfilePost';
import { useDispatch, useSelector } from 'react-redux';
import { AccessChatRoutes, getStoriesByUserRoute } from '../../../utils/ApiRoutes';
import { chatStart } from '../../Redux/Slice/ChatSlice';
import apiRequest from './../../Components/axios';


export default function Profile() {
  let [story,setstory]=useState([])
const {username}=useParams();
const [saved,Setsaved]=useState(false)
const state=useSelector((state)=>state.user)
const dispatch=useDispatch();
const navigate=useNavigate()
  const {currentUser,setcurrentUser,Loading}=GetUser(username);
const myaccount=currentUser?._id==state?.currentUser?._id;
const isFollowing=state?.currentUser?.followingname.some((user)=>user?.id==currentUser?._id)

const Private=currentUser?.Account.private && !myaccount;
const [modal,setModel]=useState(false);
  const [Userdata,setUserdata]=useState({
    user:[],
    text:""
  });
 
const ModalData=(index,txt)=>{
  if(!Private || isFollowing){
setModel(true); 
    setUserdata((follow)=>({...follow,user:currentUser[index],text:txt}));
  }
  }
  useEffect(() => {
    console.log("Loading:", Loading);
  
    if(Private && !isFollowing) {
      return;
    }
  
    async function getStory() {
        const data = await apiRequest("GET", getStoriesByUserRoute(currentUser?._id));
        console.log(data, currentUser?._id); 
        if (data.status) {
          setstory(data.story); 
        } 
    }
  
    getStory();
  }, [Loading]);
  
  

  
  

 if (!currentUser) {
    return "Loading";
}

  else{

  return (

<div className='ml-4 md:ml-72 lg:ml-96 overflow-clip'>
    <div className="flex pt-10 pb-5 mb-20 ">
     {modal && <FollowersBox follower={Userdata.user} text={Userdata.text} setModel={setModel}/>}
     <button onClick={()=>{
      if(story.length>0 && state?.currentUser?._id){
       navigate(`/story/${story[0]._id}`, { state: { stories: story} });
      }
      console.log(story)
     }}> 
      <img src={currentUser.avatarImage} className={`p-1 border-2 border-solid rounded-full w-14 h-14 lg:w-40 lg:h-40 ${story.length>0?"border-red-500":""}`} alt={`${currentUser.Username}'s avatar`} />
      </button>
      <section className="flex flex-col gap-3 ml-8 lg:ml-10 lg:gap-5 lg:mt-16">
        <div className="flex gap-2 lg:gap-5">
          <p className="lg:text-2xl">{currentUser.Username}</p>
    {state?.currentUser &&  <FollowButton currentUser={currentUser} setcurrentUser={setcurrentUser}  />}
   { (!myaccount && isFollowing ) && 
   <button className="px-2 py-1 bg-blue-400 border-2" onClick={ async()=>{
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

    {Private && !isFollowing?"Private":
    <div>
   {state?.currentUser?._id==currentUser._id && <section className="mb-20 ">
   <p className="w-screen lg:w-[75%] h-[0.5px] bg-black "></p>
<div className='flex justify-center gap-10 lg:justify-start lg:translate-x-[32%] '>
<div className="peer">
  <button className="peer-before:h-96 peer-before:w-40 peer-before:bg-red-600" onClick={()=>{
    Setsaved(false)
  }}>
    Posts
  </button>
</div>


<button onClick={()=>{
  Setsaved(true)
}}> Saved</button>
</div>
   </section> }
    <section className="lg:w-[75%] w-72    grid-cols-3 grid  " >
 
    <ProfilePost key={saved ? `saved-${currentUser._id}` : `posts-${currentUser._id}`} id={currentUser._id} saved={saved}/>
  
    </section>
    </div>
  }
    </div>
  );
}
}
