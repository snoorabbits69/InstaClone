import { useState } from 'react'
import Logo1 from '../assets/logo.png'
import Logo2 from '../assets/log2.png'
import {useNavigate} from "react-router-dom"
import {useForm} from "react-hook-form";
import { registerRoute } from '../../utils/ApiRoutes';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../Redux/Slice/Userslice';
import apiRequest from './../Components/axios';
function Register() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
const {register,handleSubmit,formState:{errors}}=useForm();
    const Navigate=useNavigate();
 const [Logo,setLogo]=useState(Logo1);

const submit=async (values)=>{
 console.log(values);
 const {Fullname,Username,Email,Password}=values;
 if(Fullname=="" || Username=="" ||Email==""||Password==""){
  alert("fill out all fields");
  }
  const data=await apiRequest('POST',registerRoute,{
    Username:Username,
    Password:Password,
    Email:Email,
  Fullname:Fullname
  })
  if (data?.status) {
    console.log("Success");
    dispatch(signInSuccess(data.user));
    navigate("/setprofile");
  } 

}
  return (
    <section className="flex flex-col gap-5 ">
   <div className=" border-solid border-2 m-auto w-96 h-[32rem]  flex-col mt-12   ">
    <div >
    <img src={Logo} className="w-56 mx-20 my-0 transition-all cursor-grab hover:opacity-80" onMouseOverCapture={()=>{
      setLogo(Logo2);
    }} onMouseOutCapture={()=>{setLogo(Logo1)}}/>
    </div>
    <form onSubmit={handleSubmit(submit)} className="relative bottom-4">
      
   <input type="text" className="pl-3 mx-12 mb-1 bg-gray-200 border-2 border-gray-300 border-solid rounded peer w-72 h-9" id="Fullname" placeholder="Fullname" {...register("Fullname")}/> 
   <input type="text" className="pl-3 mx-12 mb-1 bg-gray-200 border-2 border-gray-300 border-solid rounded peer w-72 h-9" id="Username" placeholder="Username" {...register("Username")}/> 
   <input type="email" className="pl-3 mx-12 mb-1 bg-gray-200 border-2 border-gray-300 border-solid rounded w-72 h-9" placeholder="Email" {...register("Email")}/> 
   <input type="password" className="pl-3 mx-12 mb-3 bg-gray-200 border-2 border-gray-300 border-solid rounded w-72 h-9" placeholder="Password" {...register("Password")}/> 
   <input type="password" className="pl-3 mx-12 mb-3 bg-gray-200 border-2 border-gray-300 border-solid rounded w-72 h-9" placeholder="Confirm Password" {...register("Confirm")}/> 
  <p className="text-center text-[0.8rem] mx-12 mb-3">People who use our service may have uploaded your contact information to Instagram. Learn More<br/>

By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</p>
  <button className="h-8 mx-12 mb-3 text-white bg-blue-500 rounded w-72 bg-opacity-80">Sign up</button>
  </form>
   </div>
   <div className="h-16 py-4 m-auto text-center border-2 border-solid w-96 bottom-28 ">
Have a account? <button className="text-blue-400" onClick={()=>{Navigate("/login")}}>Sign in</button>
</div>
   </section>
  )
}

export default Register;
