import axios from "axios"
import { useState,useEffect } from "react"
export default function Reels() {

  let [vids,setvids]=useState([])
  let [page,setPage]=useState(1)
  useEffect(() => {
    async function good() {
      try {
        const { data } = await axios.get(
          `https://api.pexels.com/videos/popular?page=${page}`,
          {
            headers: {
              Authorization: import.meta.env.VITE_PEXELSKEY, 
          }
        }
        );
        console.log(data.videos)
       setvids((prev)=>[...prev,...data.videos])
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    good();
  }, [page]);


  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
       if(entry.isIntersecting){
        entry.target.play()
      if(entry.target.dataset.key>vids.length-1){
        setPage((prev)=>prev+1)
      }
       }else{
        entry.target.pause()

       }
      });
    }, {
      root: document.querySelector(".reel-parent"),  
      rootMargin: '0px',                            
      threshold: 0.5,                               
    });
  
    const reels = document.getElementsByClassName('reel-vid');
    Array.from(reels).forEach((reel) => {
      console.log(reel);
      observer.observe(reel);
    });
  
    console.log(reels[0],"gg")
    return () => {
      Array.from(reels).forEach((reel) => {
        observer.unobserve(reel);
      });
    };
  }, [vids]);
  return (
    <div className='lg:ml-96 mt-5 h-[90vh] overflow-y-scroll overflow-x-hidden snap-y snap-mandatory'  >

{vids.length>0 &&
    vids.map((vid,i)=>{
      return <div   key={i} className="w-screen h-full border-2 md:w-96 snap-center">   
       <video data-key={i}  className="md:w-96 w-full h-[90vh] reel-vid" src={vid.video_files[1].link} controls />
      </div>

    })
    
    
    }

   
    </div>
  )
}
