import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import apiRequest from '../../Components/axios'
import { uploadStoryRoute } from '../../../utils/ApiRoutes'

export default function AddtoStory() {
  
  
let story=sessionStorage.getItem("story")
console.log(story)
const navigate=useNavigate()

async function base64ToFile(base64Data, filename) {
  const arr = base64Data.split(',');
  const mime = arr[0].match(/:(.*?);/)[1]; 
  const bstr = atob(arr[1]);              
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

let forstory= new File([u8arr], filename, { type: mime });
let formdata=new FormData()
formdata.append('file',forstory)
const data=await apiRequest('POST',uploadStoryRoute,formdata)
console.log(data)
if(data.status){
  navigate("/")
}
}


    return (
    <div >
      <img className='w-screen h-screen' src={story}/>
    <button onClick={()=>{
      sessionStorage.removeItem("story")
      navigate("/");

    }} className='fixed text-white bg-black border-2 left-2 top-2'>go back</button>
    <button onClick={()=>{base64ToFile(story,"formystory")}} className='fixed text-white bg-black border-2 bottom-2 right-2'>Add</button>
    </div>
  )
}

