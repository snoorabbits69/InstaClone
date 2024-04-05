import { useEffect, useState } from 'react'
import Logo1 from '../assets/logo.png'
import Logo2 from '../assets/log2.png'
import {useNavigate} from "react-router-dom"
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import axios from "axios";
import { registerRoute } from '../../utils/ApiRoutes';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function Login() {
  const navigate=useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const schema=yup.object().shape({
    Fullname:yup.string().required(),
    Username:yup.string().required(),
    Email:yup.string().email().required(),
    Password:yup.string().min(8).required(),
    Confirm:yup.string().oneOf([yup.ref("Password")],"confirm your password").required()
});
const {register,handleSubmit,formState:{errors}}=useForm({resolver:yupResolver(schema)});
    const Navigate=useNavigate();
 const [Logo,setLogo]=useState(Logo1);
 useEffect(()=>{
errors.Username?toast.error(errors.Username.message,toastOptions):" ";
errors.Fullname?toast.error(errors.Fullname.message,toastOptions):" ";
errors.Email?toast.error(errors.Email.message,toastOptions):" ";
errors.Password?toast.error(errors.Password.message,toastOptions):" ";
errors.Confirm?toast.error(errors.Confirm.message,toastOptions):" ";
 },[errors])
const submit=async (values)=>{
 
 const {Fullname,Username,Email,Password}=values;

 try{
 const {data}=await axios.post(registerRoute,{Fullname,Username,Email,Password});

 if(data.status==false){
  console.log("failed");
  console.log(data.msg);
 }
 if(data.status==true){
  console.log("success");
navigate("/Profile");

 }
}
catch(e){
  console.log(e);
}
}
  return (
    <section className="flex flex-col gap-5 ">
   <div className=" border-solid border-2 m-auto w-96 h-[32rem]  flex-col mt-12   ">
    <div >
    <img src={Logo} className=" w-56 my-0 mx-20    cursor-grab  transition-all hover:opacity-80" onMouseOverCapture={()=>{
      setLogo(Logo2);
    }} onMouseOutCapture={()=>{setLogo(Logo1)}}/>
    </div>
    <form onSubmit={handleSubmit(submit)} className="relative bottom-4">
      
   <input type="text" className="peer border-solid border-2 w-72 h-9 mx-12 mb-1 border-gray-300 rounded bg-gray-200 pl-3" id="Fullname" placeholder="Fullname" {...register("Fullname")}/> 
   <input type="text" className="peer border-solid border-2 w-72 h-9 mx-12 mb-1 border-gray-300 rounded bg-gray-200 pl-3" id="Username" placeholder="Username" {...register("Username")}/> 
   <input type="email" className=" border-solid border-2 w-72 h-9 mx-12 mb-1 border-gray-300 rounded bg-gray-200 pl-3" placeholder="Email" {...register("Email")}/> 
   <input type="password" className=" border-solid border-2 w-72 h-9 mx-12 mb-3 border-gray-300 rounded bg-gray-200 pl-3" placeholder="Password" {...register("Password")}/> 
   <input type="password" className=" border-solid border-2 w-72 h-9 mx-12 mb-3 border-gray-300 rounded bg-gray-200 pl-3" placeholder="Confirm Password" {...register("Confirm")}/> 
  <p className="text-center text-[0.8rem] mx-12 mb-3">People who use our service may have uploaded your contact information to Instagram. Learn More<br/>

By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</p>
  <button className="mx-12 w-72 h-8 text-white rounded mb-3 bg-blue-500 bg-opacity-80">Sign up</button>
  </form>
   </div>
   <div className="m-auto  text-center py-4 border-solid border-2 w-96 h-16  bottom-28    ">
Have a account? <button className="text-blue-400" onClick={()=>{Navigate("/login")}}>Sign in</button>
</div>
<ToastContainer/>
   </section>
  )
}

export default Login;
