import React, { useState } from 'react';
import logo from "../assets/logo.png";
import { BiSolidHome, BiSearch, BiCompass, BiSolidVideos, BiLogoMessenger, BiHeart, BiMessageSquareAdd } from "react-icons/bi";
import { CgMoreVerticalR } from "react-icons/cg";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import Search from '../Homepages/Search';
import gsap from 'gsap';
import Notifications from '../Homepages/Notifications';

export default function HomeSidebar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const items = [
    { icon: BiSolidHome, text: "Home" },
    { icon: BiSearch, text: "Search" },
    { icon: BiCompass, text: "Explore" },
    { icon: BiSolidVideos, text: "Reels" },
    { icon: BiLogoMessenger, text: "Message" },
    { icon: BiHeart, text: "Notifications" },
    { icon: BiMessageSquareAdd, text: "Create" },
  ];

  const tl = gsap.timeline({
    duration: 0.05
  });

  const toogleSection = (e) => {
    const elem = document.getElementById(e);
    elem.classList.toggle('active');
    const res = elem.classList.contains("active");
    const nextelem = document.getElementById(e === "Search" ? "Notifications" : "Search");
    const nextres = nextelem.classList.contains("active");
console.log(nextres);
    tl.to('.texts', { display: 'none', duration: 0.1 })
      .to('.Bar', { width: '5rem', duration: 0.2 })
      .to(elem, { width: '24rem', duration: 0.3 });

    if (res) {
      tl.play();
    } else {
      tl.reverse();
    }
  };

  return (
    <div className="Bar w-20 sm:w-60 border-r-2 border-black-500 h-full fixed">
      <section id="side">
        <div className="fixed bg-green-500 h-screen w-0 ml-20 reveal" id="Search">
          <Search />
        </div>
        <div className="fixed bg-red-500 h-screen w-0 ml-20 reveal" id="Notifications">
          <Notifications />
        </div>
      </section>
      <img src={logo} className="w-36 mb-7  " />
      <section className="px-2 text-3xl flex-col">
        {items.map((item, i) => {
          const IconComponent = item.icon;
          if (item.text === "Search" || item.text === "Notifications") {
            return (
              <motion.div className="flex px-3 text-center pt-2 rounded-xl transition-all hover:bg-slate-100 hover:cursor-grab w-full " key={`${item.text}+${i}`} initial={{ scale: 1 }}
                whileHover={{ scale: 1.02 }} transition={{ duration: 0.001, ease: "easeInOut" }} onClick={(e) => { toogleSection(item.text) }}>
                <IconComponent className="mr-3 mb-5" />
                <p className="text-base font-bold relative top-1 hidden sm:inline texts">{item.text}</p>
              </motion.div>
            );
          } else {
            return (
              <Link to={item.text === "Home" || item.text === "Search" || item.text === "Notifications" || item.text === "Create" ? "/home" : ("/home" + "/" + item.text)} key={item.text}>
                <motion.div className="flex px-3 text-center pt-2 rounded-xl transition-all hover:bg-slate-100 w-full hover:cursor-grab" key={i} initial={{ scale: 1 }}
                  whileHover={{ scale: 1.02 }} transition={{ duration: 0.001, ease: "easeInOut" }}>
                  <IconComponent className="mr-3 mb-5" />
                  <p className="text-base font-bold relative top-1 hidden sm:inline texts">{item.text}</p>
                </motion.div>
              </Link>
            );
          }
        })}
        <Link to="/home/profile">
          <motion.div className="mb-24 flex px-3 text-center pt-2 rounded-xl transition-all hover:bg-slate-200 w-full" initial={{ scale: 1 }} whileHover={{ scale: 1.05 }} transition={{ delay: 0.001, ease: 'easeInOut' }} ><BiSolidHome className="mr-3 mb-5" /><p className="text-base font-bold relative top-1 hidden sm:inline texts">Profile</p>
          </motion.div>
        </Link>
        <div className=" peer flex px-3 text-center pt-2 rounded-xl transition-all hover:bg-slate-200 w-full" id="settings"><CgMoreVerticalR className="mr-3 mb-5" /><p className="text-base font-bold relative top-1 hidden sm:inline texts">More</p></div>
        <div className="peer-hover:block hidden  left-5 w-60 h-96 border-2 rounded-xl bg-white shadow-xl absolute bottom-20 text-base px-4">
          <div>Reset Password</div>
          <div>Saved</div>
          <div>Dark mode</div>
          <div>Log Out</div>
        </div>
      </section>
    </div>
  );
}
