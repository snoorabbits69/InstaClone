import React from 'react'
import logo from "../assets/logo.png"
import {BiSolidHome,BiSearch,BiCompass,BiSolidVideos,BiLogoMessenger,BiHeart,BiMessageSquareAdd} from "react-icons/bi";
import {CgMoreVerticalR} from "react-icons/cg"
import {motion} from "framer-motion"
import HomeSidebar from '../Sidebar/HomeSidebar';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Search from '../Homepages/Search';
import { useSelector } from 'react-redux';
export default function Home() {
  const state=useSelector((state)=>state.user);
  console.log(state.currentUser);

  
  return (
    <div>
     
      
    </div>
  )
}
