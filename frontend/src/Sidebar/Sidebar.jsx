import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BiSolidHome, BiSearch, BiCompass, BiSolidVideos, BiLogoMessenger, BiHeart, BiMessageSquareAdd } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import Logout from './Logout';
import { memo } from 'react';
function Sidebar({ setShowSearch, showSearch, setShowCreate, sethidebar, hidebar,setShowNotif,showNotif }) {
  const location = useLocation();
  const state = useSelector((state) => state.user);

  useEffect(() => {
 if(location.pathname.startsWith("/message")){
  sethidebar(true);
 }
 else{
    const handleClickOutside = (e) => {
      if (!e.target.classList.contains('search')) {
        setShowSearch(false);
        if ( (location.pathname != '/message' || location.pathname != '/notifications' ) && !e.target.classList.contains('message')) {
          sethidebar(false);
        }
      }
   
      
     
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }
  }, [showSearch,hidebar,location.pathname,showNotif]);

  const handleSearchClick = () => {
    if (location.pathname !== '/message' && window.innerWidth>800) {
      sethidebar(!hidebar);
    }
    setShowSearch(!showSearch);
  };

  const handleMessageClick = () => {
    sethidebar(true);
  };



  const handleCreateClick = () => {
    setShowCreate(true);
  };

  return (
    <section className="fixed bottom-0 z-50 flex w-screen h-12 px-2 text-2xl border-t-4 justify-evenly lg:w-auto lg:bottom-auto lg:text-3xl lg:border-t-0 lg:flex-col lg:h-auto">
      <Link to="/">
        <motion.div
          className="flex px-4 pt-2 text-center transition-all rounded-xl dark:hover:bg-slate-800 hover:bg-slate-100 hover:cursor-grab"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.001, ease: 'easeInOut' }}
        >
          <BiSolidHome className="mb-5 mr-3" />
          <p className="relative hidden text-base font-bold top-1 lg:inline texts">Home</p>
        </motion.div>
      </Link>

      <motion.div
        className="hidden px-3 pt-2 text-center transition-all lg:flex rounded-xl dark:hover:bg-slate-800 hover:bg-slate-100 hover:cursor-grab search"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.001, ease: 'easeInOut' }}
        onClick={handleSearchClick}
      >
        <BiSearch className="mb-5 mr-3 search" />
        <p className="relative hidden text-base font-bold top-1 lg:inline texts search">Search</p>
      </motion.div>

      <Link to="/explore">
        <motion.div
          className="flex px-3 pt-2 text-center transition-all rounded-xl dark:hover:bg-slate-800 hover:bg-slate-100 hover:cursor-grab"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.001, ease: 'easeInOut' }}
        >
          <BiCompass className="mb-5 mr-3" />
          <p className="relative hidden text-base font-bold top-1 lg:inline texts">Explore</p>
        </motion.div>
      </Link>

      <Link to="/Reels">
        <motion.div
          className="flex px-3 pt-2 text-center transition-all rounded-xl dark:hover:bg-slate-800 hover:bg-slate-100 hover:cursor-grab"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.001, ease: 'easeInOut' }}
        >
          <BiSolidVideos className="mb-5 mr-3" />
          <p className="relative hidden text-base font-bold top-1 lg:inline texts">Reels</p>
        </motion.div>
      </Link>

      <Link to="/message">
        <motion.div
          className="relative flex px-3 pt-2 text-center transition-all message rounded-xl dark:hover:bg-slate-800 hover:bg-slate-100 hover:cursor-grab"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.001, ease: 'easeInOut' }}
          onClick={handleMessageClick}
        >
          <BiLogoMessenger className="mb-5 mr-3 " />
          {/* <span className='absolute w-5 h-5 text-sm text-black bg-red-600 rounded-full left-7 top-1'>2</span> */}
         
          <p className="relative hidden text-base font-bold top-1 lg:inline texts">Message</p>
        </motion.div>
      </Link>

      <Link to="/notifications">
      <motion.div
        className="hidden px-3 pt-2 text-center transition-all dark:hover:bg-slate-800 Notifications lg:flex rounded-xl hover:bg-slate-100 hover:cursor-grab"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.001, ease: 'easeInOut' }}
        onClick={()=>{
          sethidebar(true)
          
        }}
      >
        <BiHeart className="mb-5 mr-3" />
        <p className="relative hidden text-base font-bold top-1 lg:inline texts ">Notifications</p>
      </motion.div>
      </Link>
      <motion.div
        className="flex px-3 pt-2 text-center transition-all dark:hover:bg-slate-800 rounded-xl hover:bg-slate-100 hover:cursor-grab"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.001, ease: 'easeInOut' }}
       onClick={handleCreateClick}
      >
        <BiMessageSquareAdd className="mb-5 mr-3" />
        <p className="relative hidden text-base font-bold top-1 lg:inline texts">Create</p>
      </motion.div>

      <Link to={`/profile/${state.currentUser.Username}`}>
        <motion.div
          className="flex pt-2 pl-3 text-center transition-all dark:hover:bg-slate-800 lg:mb-24 rounded-xl hover:bg-slate-200"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ delay: 0.001, ease: 'easeInOut' }}
        >
          <img
            className="mb-5 mr-3 rounded-full w-7 h-7 lg:w-8 lg:h-8"
            src={state.currentUser.avatarImage || 'path/to/default/avatar.png'}
            alt="Profile Avatar"
          />
          <p className="relative hidden text-base font-bold top-1 lg:inline texts">Profile</p>
        </motion.div>
      </Link>
      <Logout />
    </section>
  );
}

export default memo(Sidebar);
