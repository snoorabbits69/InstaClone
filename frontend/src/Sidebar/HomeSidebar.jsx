import React, { useEffect, useState } from 'react';
import logo from "../assets/logo.png";
import { BiSolidHome, BiSearch, BiCompass, BiSolidVideos, BiLogoMessenger, BiHeart, BiMessageSquareAdd } from "react-icons/bi";
import { CgMoreVerticalR } from "react-icons/cg";
import { motion } from "framer-motion";
import { Link, useSearchParams } from 'react-router-dom';
import Search from '../Homepages/Search';
import gsap from 'gsap';
import Notifications from '../Homepages/Notifications';
import { useDispatch, useSelector } from 'react-redux';
import { signOutSuccess } from '../Redux/Slice/Userslice';
import axios from 'axios';
import { logoutRoute } from '../../utils/ApiRoutes';
export default function HomeSidebar() {
  const state=useSelector((state)=>state.user);
  console.log(state.currentUser.avatarImage);
  const dispatch=useDispatch();
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

// useEffect(()=>{
//  console.log(window.innerWidth)
// if(showSearch){
//   let tl=gsap.timeline()
// tl.to(".texts",{display:"none"}).to(".Bar",{width:'5rem'}).to("#Search",{display:"block",width:"24rem"})
// }
// else{
//   let tl=gsap.timeline()
// tl.to("#Search",{display:"none",width:"0rem"})
// window.innerWidth>500?tl.to(".Bar",{width:'15rem'}).to(".texts",{display:"block"}):"";
// }

// },[showSearch,window.innerWidth])

  return (
    <div className="fixed h-full sm:pr-2 w-fit sm:border-r-2 sm:border-b-0 Bar border-black-500 ">
      <section id="side">
        <div className="fixed hidden w-0 h-screen ml-20 reveal " id="Search">
          <Search />
        </div>
        <div className="fixed w-0 h-screen ml-20 bg-red-500 reveal" id="Notifications">
          <Notifications />
        </div>
      </section>
      <img src={logo} className="hidden w-36 mb-7 sm:block " />
      <section className="fixed bottom-0 flex w-screen h-12 px-2 text-2xl border-t-4 sm:relative sm:bottom-auto sm:text-3xl sm:w-auto sm:border-t-0 sm:flex-col sm:h-auto">
      <Link to="/home">
        <motion.div 
          className="flex px-4 pt-2 text-center transition-all rounded-xl hover:bg-slate-100 hover:cursor-grab"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.001, ease: "easeInOut" }}
        >
          <BiSolidHome className="mb-5 mr-3" />
          <p className="relative hidden text-base font-bold top-1 sm:inline">Home</p>
        </motion.div>
      </Link>

      <motion.div 
        className="hidden px-3 pt-2 text-center transition-all sm:flex rounded-xl hover:bg-slate-100 hover:cursor-grab" 
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.001, ease: "easeInOut" }}
        onClick={() => { setShowSearch(!showSearch); }}
      >
        <BiSearch className="mb-5 mr-3" />
        <p className="relative hidden text-base font-bold top-1 sm:inline">Search</p>
      </motion.div>

      <Link to="/explore">
        <motion.div 
          className="flex px-3 pt-2 text-center transition-all rounded-xl hover:bg-slate-100 hover:cursor-grab"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.001, ease: "easeInOut" }}
        >
          <BiCompass className="mb-5 mr-3" />
          <p className="relative hidden text-base font-bold top-1 sm:inline">Explore</p>
        </motion.div>
      </Link>

      <Link to="/Reels">
        <motion.div 
          className="flex px-3 pt-2 text-center transition-all rounded-xl hover:bg-slate-100 hover:cursor-grab"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.001, ease: "easeInOut" }}
        >
          <BiSolidVideos className="mb-5 mr-3" />
          <p className="relative hidden text-base font-bold top-1 sm:inline">Reels</p>
        </motion.div>
      </Link>

      <Link to="/message">
        <motion.div 
          className="flex px-3 pt-2 text-center transition-all rounded-xl hover:bg-slate-100 hover:cursor-grab"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.001, ease: "easeInOut" }}
        >
          <BiLogoMessenger className="mb-5 mr-3" />
          <p className="relative hidden text-base font-bold top-1 sm:inline">Message</p>
        </motion.div>
      </Link>

      <motion.div 
        className="hidden px-3 pt-2 text-center transition-all sm:flex rounded-xl hover:bg-slate-100 hover:cursor-grab" 
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.001, ease: "easeInOut" }}
        onClick={() => { setShowSearch(!showSearch); }}
      >
        <BiHeart className="mb-5 mr-3" />
        <p className="relative hidden text-base font-bold top-1 sm:inline">Notifications</p>
      </motion.div>

      <Link to="/Create">
        <motion.div 
          className="flex px-3 pt-2 text-center transition-all rounded-xl hover:bg-slate-100 hover:cursor-grab"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.001, ease: "easeInOut" }}
        >
          <BiMessageSquareAdd className="mb-5 mr-3" />
          <p className="relative hidden text-base font-bold top-1 sm:inline">Create</p>
        </motion.div>
      </Link>
     <Link to={`/profile/${state.currentUser.Username}`}>
          <motion.div className="flex pt-2 pl-3 text-center transition-all sm:mb-24 rounded-xl hover:bg-slate-200" initial={{ scale: 1 }} whileHover={{ scale: 1.05 }} transition={{ delay: 0.001, ease: 'easeInOut' }} ><img className="mb-5 mr-3 rounded-full w-7 h-7 sm:w-8 sm:h-8" src={state.currentUser.avatarImage} /><p className="relative hidden text-base font-bold top-1 sm:inline texts">Profile</p>
          </motion.div>
        </Link>
        <div className="hidden px-3 text-center transition-all bottom-6 sm:flex peer rounded-xl hover:bg-slate-200" onClick={()=>{
     document.getElementById("settings").style.display=="block"? gsap.to("#settings",{display:"none",height:"3rem",width:"3rem",opacity:0}):  gsap.to("#settings",{display:"block",height:"15rem",width:"15rem",opacity:1});
        }} >
          <CgMoreVerticalR className="mb-5 mr-3 " /><p className="relative hidden text-base font-bold top-1 sm:inline texts">More</p></div>
        <div className="absolute hidden px-4 text-base bg-white border-2 shadow-xl left-5 rounded-xl bottom-20" id="settings">
          <div>Reset Password</div>
          <div>Saved</div>
          <div>Dark mode</div>
          <button onClick={async()=>{
           const {data}= await axios.get(logoutRoute);
           console.log(data);
           if(data.status){
            dispatch(signOutSuccess());
           }
            }}>Log Out</button>
        </div>
      </section>
    </div>
  );
}
