import React, { useEffect,useState } from 'react';
import logo from "../assets/logo.png";
import Search from '../Homepages/Search';
import gsap from 'gsap';
import Notifications from '../Homepages/Notifications';
import { FaInstagram } from "react-icons/fa";
import Sidebar from './Sidebar';
import Create from '../Homepages/Create Component/Create'


export default function HomeSidebar() {
  const [hidebar,sethidebar]=useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
useEffect(()=>{

  if (window.innerWidth > 1024) {

 let tl=gsap.timeline()
if(hidebar){
  console.log("hide");
tl.to(".texts",{opacity:0,display:"none",duration:0.2}).to(".Bar",{width:"5rem",duration:0.1},"start")
}
if(showSearch){
  tl.to("#Search",{display:"block",opacity:1,x:80,delay:0.1,duration:0.1},"start");
  }
  if(showNotif){
    tl.to(".Notif",{display:"block",opacity:1,x:80,delay:0.1,duration:0.1},"start");
    }
    if(!showNotif){
   
      tl.to(".Notif",{opacity:0,x:-20,display:"none",delay:0.1,duration:0.1},"start")
    }
  if(!showSearch){
 

    tl.to("#Search",{opacity:0,x:0,display:"none",delay:0.1,duration:0.1},"start")
  }
 if( !hidebar){
  console.log("unhide");
tl.to(".Bar",{width:"15rem",duration:0.2}).to(".texts",{display:"block",opacity:1,duration:0.1})
}
return () => {
  gsap.killTweensOf('.texts');
  gsap.killTweensOf('#Search');
  gsap.killTweensOf('.Bar');
  gsap.killTweensOf('.Notif');
};
  }

},[hidebar,showSearch,showNotif])
useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 1024) {
      gsap.to('.texts', { display: 'none', duration: 0 });
      gsap.to('#Search', { display: 'none', duration: 0 });
    } else {
      gsap.to('.texts', { display: 'block', duration: 0 });
      setShowSearch(false);
     sethidebar(false);
    }

  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
 
const sidebarProps = {
  setShowNotif,
  showNotif,
  hidebar,
  sethidebar,
  setShowSearch,
  showSearch,
  setShowCreate,
};
  return (
    <div className="fixed z-50 overflow-hidden lg:h-full lg:w-60 lg:pr-2 lg:border-r-2 lg:border-b-0 Bar border-black-500"  >
       <div className="fixed hidden h-screen border-r-2 opacity-0 w-82 "  id="Search" > 
      <Search setShowSearch={setShowSearch}  /> 
        </div>
      
            {/* <div className="fixed hidden h-screen border-r-2 opacity-0 w-82 Notif">  */}
  {/* <Notifications/>  */}
 {/* </div>  */}
 
    { hidebar?      <FaInstagram className="hidden mt-2 ml-5 text-4xl lg:block mb-14"/>:
     <img src={logo} className="hidden w-36 mb-7 lg:block " />}
   {showCreate &&  <Create setShowCreate={setShowCreate}/>}
      <Sidebar {...sidebarProps}/> 
    </div>
  );
}
