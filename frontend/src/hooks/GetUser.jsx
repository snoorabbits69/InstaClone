import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getUserRoute } from '../../utils/ApiRoutes';
import { useSelector } from 'react-redux';
export default function GetUser(username) {
   const state=useSelector((state)=>state.user);
    const [currentUser, setcurrentUser]=useState(null);
    const [Loading, setLoading]=useState(true);
   useEffect(() => {
        const getUserData = async () => {
          try {
            const { data } = await axios.get(getUserRoute(username));
            if(data.user){
            setcurrentUser(data.user);
            setLoading(false);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        getUserData();
      }, [username]);
      return {currentUser,setcurrentUser,Loading};
}
