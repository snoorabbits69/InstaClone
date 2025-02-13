import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import apiRequest from '../../Components/axios'
import { getStoriesbyIdRoute } from '../../../utils/ApiRoutes'

export default function DisplayStory() {
    const {id}=useParams()
    const location=useLocation()
    const {stories}=location.state
    let [userStories,setuserStories]=useState([])
    let navigate=useNavigate()
   useEffect(()=>{
      async function fetchStories(){
        stories.map(async(story)=>{
         console.log(story)
            const data=await apiRequest('GET',getStoriesbyIdRoute(story))
            
            if(data.status){
                setuserStories((prev)=>[...prev,data.story])
            }
        })

      }
      fetchStories()
   
   },[id])
  return (
    <div className='flex justify-center w-screen'>
        <button className='fixed right-2 top-2' onClick={()=>{
            navigate("/")
        }}>
            close
        </button>
        {userStories?.map((story,id)=>{
            return <section key={id}>
<img className='h-screen w-96' src={story.image}/>
            </section>
        })}
    </div>
    
  )
}
