import { useState } from 'react'
import Logo1 from '../assets/logo.png'
import Logo2 from '../assets/log2.png'
import { useNavigate } from 'react-router-dom';
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import axios from 'axios';
import { useEffect } from 'react';
import { loginRoute } from '../../utils/ApiRoutes';
import{ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function Login() {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const Navigate=useNavigate();
  const [Logo,setLogo]=useState(Logo1);
  const schema=yup.object().shape({
    Username:yup.string().required("invalid username or password"),
    Password:yup.string().min(6).required("invalid username or password"),
});
const {register,handleSubmit,formState:{errors}}=useForm({resolver:yupResolver(schema)});
useEffect(()=>{
  errors.Username?toast.error(errors.Username.message,toastOptions):" ";
  errors.Password?toast.error(errors.Password.message,toastOptions):" ";
   },[errors])
const submit=async (values)=>{
  
  const{Username,Password}=values;

  const {data}=await axios.post(loginRoute,{Username,Password});
  if(data.status){
    localStorage.setItem(data.tokenid,Username);
    Navigate("/home");
  }
  if(!data.status){
toast.error(data.msg,toastOptions);

  }
}
  

  return (
    <section>
   <div className=" border-solid border-2 w-96 h-96 absolute right-[400px] top-14 flex-col justify-center align-middle   ">
    <div>
    <img src={Logo} className=" w-56 my-0 mx-20    cursor-grab  transition-all hover:opacity-80" onMouseOverCapture={()=>{
      setLogo(Logo2);
    }} onMouseOutCapture={()=>{setLogo(Logo1)}}/>
    </div>
    <form onSubmit={handleSubmit(submit)}>
   <input type="text" className=" border-solid border-2 w-72 h-9 mx-12 mb-1 border-gray-300 rounded bg-gray-200 pl-3" placeholder="Username" {...register("Username")}/> 
   <input type="password" className=" border-solid border-2 w-72 h-9 mx-12 mb-3 border-gray-300 rounded bg-gray-200 pl-3" placeholder="Password" {...register("Password")}/> 
  <button className="mx-12 w-72 h-8 text-white rounded mb-3 bg-blue-500 bg-opacity-80">Log in</button>
</form>
   <div className="mx-12 w-72 text-center flex gap-3"><p className="bg-gray-500 border-b-2 w-32 h-[1px] relative top-3"/>OR<p className="bg-gray-500 border-b-2 w-32 h-[1px] relative top-3"/></div>
  
   </div>
   <div className="text-center py-6 border-solid border-2 w-96 h-20 absolute right-[400px] bottom-56   ">
Don't have a account? <button className="text-blue-400" onClick={()=>{Navigate("/register")}}>Sign up</button>
</div>
   </section>
  )
}

export default Login;
