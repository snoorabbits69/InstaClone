import  { useEffect, useState } from 'react'
import { GetUserfromIdRoute } from '../../utils/ApiRoutes';
import apiRequest from '../Components/axios';

export default function GetUserfromId(id) {
const [User,setUser]=useState();
const [Loading,setLoading]=useState(true);
useEffect(()=>{
const getUser=async()=>{
    const api=GetUserfromIdRoute(id);
    const data=await apiRequest('GET',api)
    if(data.user){
        setUser(data.user);
        setLoading(false);
    }
}
getUser();
},[id])
return {User,Loading,setUser}
}
