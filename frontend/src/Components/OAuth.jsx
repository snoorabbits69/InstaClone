import { app } from './Firebase'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { FaGoogle } from "react-icons/fa6";
import { GoogleRoute } from '../../utils/ApiRoutes';
import { useDispatch } from 'react-redux';
import { signInFailure, signInSuccess } from '../Redux/Slice/Userslice';
import { useNavigate } from 'react-router-dom';
import apiRequest from './axios';
export default function OAuth() {
const navigate=useNavigate();
    const dispatch=useDispatch();
    const auth=getAuth(app);
    const handle=async()=>{
      const provider=new GoogleAuthProvider();
      const result=await signInWithPopup(auth,provider);
      const {displayName,email,photoURL}=result.user;
const data=await apiRequest('POST',GoogleRoute,{Username:displayName,Email:email,avatarImage:photoURL.replace("s96","s400"),Fullname:result._tokenResponse.fullName});
if(data.status){
    dispatch(signInSuccess(data.user));
    navigate("/");
}
else{
    dispatch(signInFailure);
    
}
}
  return (
    <button onClick={handle}>
        <div className="flex gap-5 mx-12 mt-5 align-middle">
        <FaGoogle className="mt-1"/> Continue With Google
        </div>
    </button>
  )
}
