import React from 'react'
import { CgMoreVerticalR } from "react-icons/cg";
import gsap from 'gsap';
import { logoutRoute } from '../../utils/ApiRoutes';
import apiRequest from '../Components/axios';
import { signOutSuccess } from '../Redux/Slice/Userslice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
export default function Logout() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
  return (
    <>
    <div className="hidden px-3 text-center transition-all bottom-6 lg:flex peer rounded-xl hover:bg-slate-200"
     onClick={()=>{
        document.getElementById("settings").style.display=="block"? gsap.to("#settings",{display:"none",height:"3rem",width:"3rem",opacity:0}):  gsap.to("#settings",{display:"block",height:"15rem",width:"15rem",opacity:1});
           }} >

             <CgMoreVerticalR className="mb-5 mr-3 " /><p className="relative hidden text-base font-bold top-1 lg:inline texts">More</p></div>
           <div className="absolute hidden px-4 text-base bg-white border-2 shadow-xl left-5 rounded-xl bottom-20" id="settings">
             <div>Reset Password</div>
             <div>Saved</div>
             <div>Dark mode</div>
             <button onClick={async()=>{
              const data= await apiRequest('GET',logoutRoute);
              if(data.status){
               dispatch(signOutSuccess());
               navigate("/login");
              }
               }}>Log Out</button>
           </div>
           </>
  )
}
