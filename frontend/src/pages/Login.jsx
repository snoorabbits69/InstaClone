import { useState } from 'react'
import Logo1 from '../assets/logo.png'
import Logo2 from '../assets/log2.png'
import { useNavigate } from 'react-router-dom';
import {useForm} from "react-hook-form";
import { ForgetPasswordRoute, loginRoute } from '../../utils/ApiRoutes';

import sideimg from '../assets/auth.png'
import { useDispatch } from 'react-redux';
import { signInFailure, signInSuccess } from '../Redux/Slice/Userslice';
import OAuth from '../Components/OAuth';
import apiRequest from '../Components/axios';
function Login() {
  const dispatch=useDispatch();

 
  
  const Navigate=useNavigate();
  const [Logo,setLogo]=useState(Logo1);

const {register,handleSubmit,formState:{errors}}=useForm();

const submit=async (values)=>{
  const{Username,Password}=values;
  if(Username=="" || Password==""){
    alert("fill all the fields")
    return;
  }
  
const data=await apiRequest('POST',loginRoute,{
  Username:Username,
  Password:Password
})
    if (data.status) {
      dispatch(signInSuccess(data.user));
      Navigate("/");
    } else {
      dispatch(signInFailure());
    }
}
  

  return (
    <section className='flex justify-center'>
      <div className="hidden mt-12 h-44 sm:block">
<img src={sideimg} className="h-[35rem] w-[25rem]"/>
      </div>
    <div className="flex flex-col self-center gap-5">
   <div className="m-auto mt-20 border-solid border-2 w-80 h-96 right-[400px]  flex-col justify-center align-middle   ">
    <div>
    <img src={Logo} className=" w-56 my-0 mx-[3rem]   cursor-grab  transition-all hover:opacity-80" onMouseOverCapture={()=>{
      setLogo(Logo2);
    }} onMouseOutCapture={()=>{setLogo(Logo1)}}/>
    </div>
    <form onSubmit={handleSubmit(submit)}>
   <input type="text" className="pl-3 mx-12 mb-1 bg-gray-200 border-2 border-gray-300 border-solid rounded w-60 h-9" placeholder="Username" {...register("Username")}/> 
   <input type="password" className="pl-3 mx-12 mb-3 bg-gray-200 border-2 border-gray-300 border-solid rounded w-60 h-9" placeholder="Password" {...register("Password")}/> 
  <button className="h-8 mx-12 mb-3 text-white bg-blue-500 rounded w-60 bg-opacity-80">Log in</button>
</form>
   <div className="flex gap-3 mx-10 text-center w-60"><p className="bg-gray-500 border-b-2 w-32 h-[1px] relative top-3"/>OR<p className="bg-gray-500 border-b-2 w-32 h-[1px] relative top-3"/></div>
   <OAuth/>
   <button className='mx-24 text-sm'
   onClick={async()=>{
   window.open(ForgetPasswordRoute);
   }}
   >Forgot Password?</button>

   </div>
   <div className="h-20 py-6 m-auto text-center border-2 border-solid w-80 bottom-56 ">
Don't have a account? <button className="text-blue-400" onClick={()=>{Navigate("/register")}}>Sign up</button>
</div>
   </div>
 
   </section>
  )
}

export default Login;
