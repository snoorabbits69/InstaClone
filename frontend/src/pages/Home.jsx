import React from 'react'
import logo from "../assets/logo.png"
import {BiSolidHome,BiSearch,BiCompass,BiSolidVideos,BiLogoMessenger,BiHeart,BiMessageSquareAdd} from "react-icons/bi";
import {CgMoreVerticalR} from "react-icons/cg"
import {motion} from "framer-motion"
import HomeSidebar from '../Sidebar/HomeSidebar';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Search from '../Homepages/Search';
import { useSelector } from 'react-redux';
import GetPosts from '../hooks/GetPosts';
export default function Home() {
  const state=useSelector((state)=>state.user);
const {Post}=GetPosts("66858183a9eaf10f3ecefaf8")
console.log(Post);
return (
    <div>
     
      
    </div>
  )
}
