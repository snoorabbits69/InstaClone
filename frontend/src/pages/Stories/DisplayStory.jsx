import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import apiRequest from '../../Components/axios';
import { getStoriesbyIdRoute } from '../../../utils/ApiRoutes';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export default function DisplayStory() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { stories } = location.state || {}; 
 
    const [userStories, setUserStories] = useState([]);
      const [x, setX] = useState(0);
    
      const handleIncrement = (e) => {
        e.preventDefault();
        const size = userStories.length - 1;  
    
        if (x < size ) {  
            setX((prev) => prev + 1);  
        } else {
            setX(0);  
        }
    };
    
    const handleDecrement = (e) => {
        e.preventDefault();
        const size = userStories.length - 1;  
    
        if (x > 0) {  
            setX((prev) => prev - 1);  
        } else {
            setX(size);  
        }
    };
    

    const fetchStories = useCallback(async () => {
        let fetchedStories = [];

        if (!stories) {
            const data = await apiRequest('GET', getStoriesbyIdRoute(id));
            if (data.status){ fetchedStories = data.story; }
        }  else {
            fetchedStories = stories;
        }
       console.log(fetchedStories)
        setUserStories(fetchedStories);
       
    }, [id, stories]);


    useEffect(() => {
        fetchStories();
    }, [fetchStories]);

    return (
        <div className="flex justify-center w-screen">
            <button className="fixed right-2 top-2" onClick={() => navigate("/")}>
                Close
            </button>
            <section className="relative overflow-hidden w-96">
            <div className="absolute left-0 z-30 flex justify-around py-2 w-96">
                {userStories.map((s, index) => (
                 <span key={index} className={`w-full h-1 border-2 rounded-full transition-all ${x === index ? "bg-white" : "bg-gray-600"}`}></span>


                                 ))}
                                   </div>
                <section className="relative flex transition-all w-max"  style={{ transform: `translateX(-${x*24}rem)` }}>
                   
                   
                    {userStories.map((story, index) => (
                        
                        
                        <section className="w-96" key={index}>
                            <img className="w-screen h-screen md:w-96" src={story.image} alt="story" />
                        </section>
                        
                    ))}
                </section>
                { userStories.length>1 && <>
                            <button onClick={(e)=>{handleDecrement(e)}} className="absolute text-2xl top-60"><FaAngleLeft className="text-black "/></button>
                            <button onClick={(e)=>{handleIncrement(e)}} className="absolute text-2xl right-2 top-60 "><FaAngleRight className="text-black "/></button>
                          </>
                          }
            </section>
        </div>
    );
}
