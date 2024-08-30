import React, { useEffect,useState } from 'react';
import logo from "../assets/logo.png";
import Search from '../Homepages/Search';
import gsap from 'gsap';
import Notifications from '../Homepages/Notifications';
import { FaInstagram } from "react-icons/fa";
import { useGSAP } from '@gsap/react';
import Sidebar from './Sidebar';
import Create from '../Homepages/Create';

gsap.registerPlugin(useGSAP);

export default function HomeSidebar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
useGSAP(()=>{
  if (window.innerWidth > 1024) {

 let tl=gsap.timeline()
if(showSearch){
tl.to(".texts",{opacity:0,display:"none",duration:0.2}).to(".Bar",{width:"5rem",duration:0.2},"start").to("#Search",{display:"block",opacity:1,x:80,delay:0.1,duration:0.2},"start");
}
else if( !showSearch){
  tl.to("#Search",{opacity:0,x:0,display:"none",delay:0.1,duration:0.2},"start").to(".Bar",{width:"15rem",duration:0.2}).to(".texts",{display:"block",opacity:1,duration:0.2})
}
  }
},[showSearch])
  const handleResize = () => {
        if (window.innerWidth < 1024) {
      gsap.to(".texts", { display: "none",duration:0 });
      gsap.to("#Search", { display: "none", duration:0});
    }
    else{
      gsap.to(".texts", { display: "block",duration:0 });

    setShowSearch(false);

    }

    }
 window.addEventListener("resize", handleResize);

 

  return (
    <div className="fixed h-full lg:z-50 lg:w-60 lg:pr-2 lg:border-r-2 lg:border-b-0 Bar border-black-500"  >
       <div className="fixed hidden h-screen border-r-2 opacity-0 w-82 "  id="Search" > 
      <Search setShowSearch={setShowSearch}  /> 
        </div>
    { showSearch?      <FaInstagram className="mt-2 ml-5 text-4xl mb-14"/>:
     <img src={logo} className="hidden w-36 mb-7 lg:block " />}
   {showCreate &&  <Create setShowCreate={setShowCreate}/>}
      <Sidebar setShowSearch={setShowSearch} showSearch={showSearch} setShowCreate={setShowCreate}/> 
    </div>
  );
}
