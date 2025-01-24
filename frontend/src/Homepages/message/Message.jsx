import {useRef,useEffect, useState} from 'react';
import Mychats from './Mychats';
import ChatBox from './ChatBox';
import { useNavigate, useParams } from 'react-router-dom';
import Addgroup from './Addgroup';
import gsap from 'gsap';
import GetUsers from '../../hooks/GetUsers';
import { chatStart } from '../../Redux/Slice/ChatSlice';
import { useDispatch } from 'react-redux';
import { AccessChatRoutes } from '../../../utils/ApiRoutes';
import apiRequest from './../../Components/axios';
export default function Message() {
 const params=useParams()
 let navigate=useNavigate();

const [dialogstatus,setdialogstatus]=useState(false);
const [inputValue, setInputValue] =useState('');
 let Users= GetUsers(inputValue);
 let dialogref=useRef();
let dispatch=useDispatch()

useEffect(()=>{ 
    gsap.from("#dialog",{scale:0})
    gsap.to("#dialog",{scale:1,ease:"bounce.out"});
    },[dialogstatus])
    
  return (
    <div className="">
    <div className="flex lg:ml-20 ">
    <div className={`h-screen pl-2 border-r-2 w-screen md:w-80 dark:bg-gray-800 md:block ${params.user ? "hidden md:block" : "block"}`}>
            <div className="h-full overflow-y-auto">
                <div className="p-3 text-xl font-extrabold text-gray-600 dark:text-gray-200">InstaClone</div>
                <div className="flex p-3 search-chat">
                    <input
                    onChange={(e)=>{
                        dialogref.current.open=true;
                        if(e.target.value==''){
                            dialogref.current.open=false;
                        }
setInputValue(e.target.value)
                    }}
                    className="w-full p-3 text-sm text-gray-700 bg-gray-200 input dark:text-gray-200 focus:outline-none dark:bg-gray-700 rounded-l-md" type="text" placeholder="Search Messages"/>
                    <div className="flex items-center justify-center pr-3 text-gray-400 bg-gray-200 dark:bg-gray-700 rounded-r-md">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg> */}
                    
                    </div>
                </div>
                <dialog className="absolute mr-2 md:mr-0 md:ml-24 w-screen  md:w-72 h-96 bg-white border-2 top-[6.8rem]" ref={dialogref}>
                {Users.User.map((user)=>{
  return <button className='z-50 w-72'
   onClick={async ()=>{
  
    const data=await apiRequest('post',AccessChatRoutes,{Userid:user._id})
      console.log(data)
      let messagingUser=data.users[0]==user._id?data.users[0]:data.users[1]
      dispatch(chatStart(data))
      dialogref.current.open=false;
      navigate(`/message/${messagingUser?.Username}`)
    }} key={`${user.Username}`}> <div className="flex gap-3 pl-10 transition-all rounded-lg hover:bg-gray-200">
    <img src={user.avatarImage} className="w-10 h-10 mt-2 rounded-full"/>
    <section>
   
    <p className='text-lg'>{user.Fullname}</p>
    </section>
  </div>
  </button>
})}
                        </dialog>
                <button className="p-3 text-lg text-gray-600 border-2 rounded-full font-semibol dark:text-gray-200" onClick={()=>{
               setdialogstatus(true)
                }}>Add Group </button>
              <Mychats />
            </div>
            <dialog open={dialogstatus}   className="absolute text-red-600 top-10 right-[50%] text-md" id="dialog">
                <Addgroup setdialogstatus={setdialogstatus} />
            </dialog>
        </div>               
        <div className="flex-grow h-screen p-2 rounded-md">
           {params.user?<ChatBox/>:""}
        </div>
    </div>
</div>
)


}
