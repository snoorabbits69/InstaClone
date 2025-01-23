import { useEffect, useState } from 'react'
import { getUserRoute } from '../../utils/ApiRoutes';
import apiRequest from '../Components/axios';
export default function GetUser(username) {
    const [currentUser, setcurrentUser]=useState(null);
    const [Loading, setLoading]=useState(true);
   useEffect(() => {
        const getUserData = async () => {
      
            const { data } = await apiRequest('GET',getUserRoute(username))
            if(data.user){
            setcurrentUser(data.user);
            setLoading(false);
            }
          
        };
    
        getUserData();
      }, [username]);
      return {currentUser,setcurrentUser,Loading};
}
