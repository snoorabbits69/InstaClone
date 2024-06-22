import { useReducer, useState } from 'react'
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
import sideimg from '../assets/auth.png'
import { useDispatch, useSelector } from 'react-redux';
import {store} from "../Redux/Store"
import { signInFailure, signInSuccess } from '../Redux/Slice/Userslice';
import OAuth from '../Components/OAuth';
axios.defaults.withCredentials = true;
function Login() {
  const state =useSelector((state)=>state.user);
  const dispatch=useDispatch();
console.log(state);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const Navigate=useNavigate();
  const [Logo,setLogo]=useState(Logo1);

const {register,handleSubmit,formState:{errors}}=useForm();

const submit=async (values)=>{

  const{Username,Password}=values;

  const {data}=await axios.post(loginRoute,{Username,Password});
  if(data.status){
   dispatch(signInSuccess(data.user))
    Navigate("/home");
  }
  if(!data.status){
    dispatch(signInFailure());
toast.error(data.msg,toastOptions);

  }
}
  

  return (
    <section className='flex justify-center'>
      <div className="h-44  mt-12 sm:block hidden">
<img src={sideimg} className="h-[35rem] w-[25rem]"/>
      </div>
    <div className="flex flex-col gap-5 self-center">
   <div className="m-auto mt-20 border-solid border-2 w-80 h-96 right-[400px]  flex-col justify-center align-middle   ">
    <div>
    <img src={Logo} className=" w-56 my-0 mx-[3rem]   cursor-grab  transition-all hover:opacity-80" onMouseOverCapture={()=>{
      setLogo(Logo2);
    }} onMouseOutCapture={()=>{setLogo(Logo1)}}/>
    </div>
    <form onSubmit={handleSubmit(submit)}>
   <input type="text" className=" border-solid border-2 w-60 h-9 mx-12 mb-1 border-gray-300 rounded bg-gray-200 pl-3" placeholder="Username" {...register("Username")}/> 
   <input type="password" className=" border-solid border-2 w-60 h-9 mx-12 mb-3 border-gray-300 rounded bg-gray-200 pl-3" placeholder="Password" {...register("Password")}/> 
  <button className="mx-12 w-60 h-8 text-white rounded mb-3 bg-blue-500 bg-opacity-80">Log in</button>
</form>
   <div className="mx-10 w-60 text-center flex gap-3"><p className="bg-gray-500 border-b-2 w-32 h-[1px] relative top-3"/>OR<p className="bg-gray-500 border-b-2 w-32 h-[1px] relative top-3"/></div>
   <OAuth/>
  
   </div>
   <div className="m-auto text-center py-6 border-solid border-2 w-80 h-20  bottom-56   ">
Don't have a account? <button className="text-blue-400" onClick={()=>{Navigate("/register")}}>Sign up</button>
</div>
   </div>
   </section>
  )
}

export default Login;
