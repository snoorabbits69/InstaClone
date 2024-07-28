import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { SearchRoute } from '../../utils/ApiRoutes';

export default function GetUsers(value) {
    const [User,setUser]=useState([]);
    const [Loading,setLoading]=useState(true);
   useEffect(()=>{

    const controller=new AbortController();
  if(value){
        const api=SearchRoute(value);
        const get=async()=>{
            try{
            const {data}=await axios.get(api,{
                signal:controller.signal
            });
           setUser(data.user);
            }
            catch(e){
                // console.log(e);
            }
        }
        get();
  }
  else{
    setUser([]);
  }
    return ()=>{
        controller.abort();
    }
    },[value]);
   return{User,Loading};

}
