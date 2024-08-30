import React, { useEffect, useState } from 'react'
import { GetUserfromIdRoute } from '../../utils/ApiRoutes';
import axios from 'axios';

export default function GetUserfromId(id) {
const [User,setUser]=useState();
const [Loading,setLoading]=useState(true);
useEffect(()=>{
const getUser=async()=>{
    const api=GetUserfromIdRoute(id);
    const {data}=await axios.get(api,{
        withCredentials:true
    });
    if(data.user){
        setUser(data.user);
        setLoading(false);
    }
}
getUser();
},[id])
return {User,Loading,setUser}
}
