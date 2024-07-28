import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { BiSolidHome, BiSearch, BiCompass, BiSolidVideos, BiLogoMessenger, BiHeart, BiMessageSquareAdd } from "react-icons/bi";
import { useSelector } from 'react-redux';
import Logout from './Logout';

export default function Sidebar({setShowSearch,showSearch,setShowCreate}) {
const state=useSelector((state)=>state.user);
  return (
    <section className="fixed bottom-0 flex w-screen h-12 px-2 text-2xl border-t-4 justify-evenly lg:w-auto lg:bottom-auto lg:text-3xl lg:border-t-0 lg:flex-col lg:h-auto"  onClick={(e)=>{
             
          document.addEventListener("click",(e)=>{
        try{
            const searchElement = document.getElementById("Search");
            if (!searchElement.contains(e.target) && !e.target.classList.contains("search")) {
              setShowSearch(false);
            }
          }
          catch(e){
            return ;
          }
          })
        
            }}>
              <Link to="/home">
                <motion.div 
                  className="flex px-4 pt-2 text-center transition-all rounded-xl hover:bg-slate-100 hover:cursor-grab"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.001, ease: "easeInOut" }}
                >
                  <BiSolidHome className="mb-5 mr-3" />
                  <p className="relative hidden text-base font-bold top-1 lg:inline texts">Home</p>
                </motion.div>
              </Link>
        
              <motion.div 
                className="hidden px-3 pt-2 text-center transition-all lg:flex rounded-xl hover:bg-slate-100 hover:cursor-grab search" 
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.001, ease: "easeInOut" }}
                onClick={() => { setShowSearch(!showSearch); }}
              >
                <BiSearch className="mb-5 mr-3 search" />
                <p className="relative hidden text-base font-bold top-1 lg:inline texts search">Search</p>
              </motion.div>
        
              <Link to="/explore">
                <motion.div 
                  className="flex px-3 pt-2 text-center transition-all rounded-xl hover:bg-slate-100 hover:cursor-grab"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.001, ease: "easeInOut" }}
                >
                  <BiCompass className="mb-5 mr-3" />
                  <p className="relative hidden text-base font-bold top-1 lg:inline texts">Explore</p>
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
                  <p className="relative hidden text-base font-bold top-1 lg:inline texts">Reels</p>
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
                  <p className="relative hidden text-base font-bold top-1 lg:inline texts">Message</p>
                </motion.div>
              </Link>
        
              <motion.div 
                className="hidden px-3 pt-2 text-center transition-all lg:flex rounded-xl hover:bg-slate-100 hover:cursor-grab" 
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.001, ease: "easeInOut" }}
              >
                <BiHeart className="mb-5 mr-3" />
                <p className="relative hidden text-base font-bold top-1 lg:inline texts">Notifications</p>
              </motion.div>
        
                <motion.div 
                  className="flex px-3 pt-2 text-center transition-all rounded-xl hover:bg-slate-100 hover:cursor-grab"
                  initial={{ scale: 1 }} texts
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.001, ease: "easeInOut" }}
                  onClick={()=>{setShowCreate(true)}}
                >
                  <BiMessageSquareAdd className="mb-5 mr-3" />
                  <p className="relative hidden text-base font-bold top-1 lg:inline texts">Create</p>
                </motion.div>
             <Link to={`/profile/${state.currentUser.Username}`}>
                  <motion.div className="flex pt-2 pl-3 text-center transition-all lg:mb-24 rounded-xl hover:bg-slate-200" initial={{ scale: 1 }} whileHover={{ scale: 1.05 }} transition={{ delay: 0.001, ease: 'easeInOut' }} ><img className="mb-5 mr-3 rounded-full w-7 h-7 lg:w-8 lg:h-8" src={state.currentUser.avatarImage} />
                  <p className="relative hidden text-base font-bold top-1 lg:inline texts">Profile</p>
                  </motion.div>
                </Link>
               <Logout/>
              </section>
  )
}
