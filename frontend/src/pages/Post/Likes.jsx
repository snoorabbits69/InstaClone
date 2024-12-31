import React from 'react'
import { IoHeartOutline } from "react-icons/io5";
import { IoChatboxOutline } from "react-icons/io5";
export default function Likes() {
  return (
    <div className="flex flex-row gap-2 p-4 text-3xl">
    <button title="like" >   <IoHeartOutline/></button> 
    <button title="Comment" >   <IoChatboxOutline/></button> 
    </div>
  )
}
