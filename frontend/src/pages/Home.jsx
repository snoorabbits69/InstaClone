import React from 'react'
import logo from "../assets/logo.png"
import {BiSolidHome,BiSearch,BiCompass,BiSolidVideos,BiLogoMessenger,BiHeart,BiMessageSquareAdd} from "react-icons/bi";
import {CgMoreVerticalR} from "react-icons/cg"
export default function Home() {
  return (
    <div className=" w-60 border-r-2 border-black-500 h-full fixed">
        <img src={logo} className="w-36 mb-7  "/>
        <section className="px-2 text-3xl flex-col">
          <div className="flex px-3 text-center pt-2 rounded-xl transition-all hover:bg-slate-200 w-full" ><BiSolidHome className="mr-3 mb-5"/><p className="text-base font-bold relative top-1 ">Home</p></div>
              <div className="flex px-3 text-center pt-2 rounded-xl transition-all hover:bg-slate-200 w-full" ><BiSearch className="mr-3 mb-5"/><p className="text-base font-bold relative top-1 ">Search</p></div>
              <div className="flex px-3 text-center pt-2 rounded-xl transition-all hover:bg-slate-200 w-full" ><BiCompass className="mr-3 mb-5"/><p className="text-base font-bold relative top-1 ">Explore</p></div>
              <div className="flex px-3 text-center pt-2 rounded-xl transition-all hover:bg-slate-200 w-full" ><BiSolidVideos className="mr-3 mb-5"/><p className="text-base font-bold relative top-1 ">Reels</p></div>
              <div className="flex px-3 text-center pt-2 rounded-xl transition-all hover:bg-slate-200 w-full" ><BiLogoMessenger className="mr-3 mb-5"/><p className="text-base font-bold relative top-1 ">Messages</p></div>
              <div className="flex px-3 text-center pt-2 rounded-xl transition-all hover:bg-slate-200 w-full" ><BiHeart className="mr-3 mb-5"/><p className="text-base font-bold relative top-1 ">Notifications</p></div>
              <div className="flex px-3 text-center pt-2 rounded-xl transition-all hover:bg-slate-200 w-full" ><BiMessageSquareAdd className="mr-3 mb-5"/><p className="text-base font-bold relative top-1 ">Create</p></div>
              <div className="mb-24 flex px-3 text-center pt-2 rounded-xl transition-all hover:bg-slate-200 w-full" ><BiSolidHome className="mr-3 mb-5"/><p className="text-base font-bold relative top-1 ">Profile</p></div>
              <div className=" peer flex px-3 text-center pt-2 rounded-xl transition-all hover:bg-slate-200 w-full" id="settings"><CgMoreVerticalR className="mr-3 mb-5"/><p className="text-base font-bold relative top-1 ">More</p></div>
        <div className="peer-hover:block hidden  left-5 w-60 h-96 border-2 rounded-xl bg-white shadow-xl absolute bottom-20 text-base px-4">
          <div>Reset Password</div>
          <div>Saved</div>
          <div>Dark mode</div>
          <div>Log Out</div>
        </div>
        </section>
    </div>
  )
}
