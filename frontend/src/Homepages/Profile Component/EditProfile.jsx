import  { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateFullNameRoute, UpdatePasswordRoute, UpdateUsernameRoute, uploadRoute } from '../../../utils/ApiRoutes';
import { RemoveProfilePicRoute } from '../../../utils/ApiRoutes';
import { UpdateAvatarImage, updateFullName, updateUserName } from '../../Redux/Slice/Userslice';
import Togglebutton from './Tooglebutton';
import Darkmode from './Darkmode';
import{toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import apiRequest from './../../Components/axios';
import { signOutSuccess } from '../../Redux/Slice/Userslice';
import { logoutRoute } from '../../../utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';

const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
export default function EditProfile() {
    let navigate=useNavigate()
    const state = useSelector((state) => state.user);
    const [username, setUsername] = useState(state?.currentUser.Username);
    const [fullname, setFullname] = useState(state?.currentUser.Fullname);
    const dispatch = useDispatch();

    const inputRef = useRef();
    const dialogRef = useRef([null, null]); 

    const handleUpload = async (e) => {
        if (e.target.files[0]) {
            const formData = new FormData();
            formData.append('file', e.target.files[0]);
            const api = uploadRoute(state.currentUser._id);
            const data = await apiRequest('POST',api, formData);

            if (data.status) {
                dispatch(UpdateAvatarImage(data.user.avatarImage));
                dialogRef.current[0].close(); 
            }
        }
    };

    const handleUpdateUsername = async () => {
        if (username) {
            try {
                const data = await apiRequest('PUT',UpdateUsernameRoute, { Username: username });
                if (data.status) {
                    dispatch(updateUserName(username));
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleUpdateFullname = async () => {
        if (fullname) {
            try {
                const data = await apiRequest('PUT',UpdateFullNameRoute, { Fullname: fullname });
                if (data.status) {
                    dispatch(updateFullName(fullname));
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleRemoveProfilePic = async () => {
        const api = RemoveProfilePicRoute(state.currentUser._id);
        const data = await apiRequest('DELETE',api);
        if (data.status) {
            dispatch(UpdateAvatarImage(data.user.avatarImage));
            dialogRef.current[0].close(); // Close the first dialog after removal
        }
    };
const  ChangePassword=async (e)=>{
        e.preventDefault();
        const { oldpassword, newpassword, confirmpassword } = e.target.elements;
        console.log('Old Password:', oldpassword.value);
      if(newpassword.value!=confirmpassword.value){
        toast.error("Passwords dont match",toastOptions);
        return ;
      }
    let data=await apiRequest('PUT',UpdatePasswordRoute,{
Password:oldpassword.value,
newPassword:newpassword.value
    })
    if(data.status){
        console.log(data)
        dialogRef.current[1].close();
    }
    else{
        toast.error(data.error,toastOptions);
    }
      
}

    return (
        <div
            className="flex flex-col gap-2 ml-2 md:ml-10 lg:ml-80"
            onClick={(e) => {
                if (e.target.parentElement.classList.contains('dialog')) {
                    return;
                } else if (e.target.classList.contains('change')) {
                    return;
                } else {
                    dialogRef.current[0].close(); // Close the first dialog on outside click
                }
            }}
        >
          
            <dialog className="absolute sm:translate-x-10  md:translate-x-[-50%] " id="ProfileDialog" ref={(e) =>{
                return dialogRef.current[0]=e
            }}>
                  <input type="file"
                accept="image/png, image/gif, image/jpeg"
                className="hidden"
                ref={inputRef}
                onChange={handleUpload}
            />
                <div className="flex flex-col border-2 dialog rounded-xl">
                    <p className="p-4 px-32 text-xl text-center border-b-2">Edit Profile</p>
                    <button className="p-4 border-b-2" onClick={() => inputRef.current.click()}>
                        Upload Photo
                    </button>
                    <button className="p-4 border-b-2" onClick={handleRemoveProfilePic}>
                        Remove
                    </button>
                    <button
                        className="p-4 border-b-2"
                        onClick={() => {
                            dialogRef.current[0].close();
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </dialog>
            <h1 className="pt-5 pb-2 font-bold sm:text-xl">Edit Profile</h1>
            <section className="flex flex-col p-4 border-2 w-max">
                <div className="flex h-20 w-80 sm:w-[30rem]">
                    <img
                        src={state.currentUser.avatarImage}
                        className="h-full p-3 rounded-full"
                        alt="User Avatar"
                    />
                    <section className="pt-2">
                        <p className="font-bold">{state.currentUser.Username}</p>
                        <p className="text-sm">{state.currentUser.Fullname}</p>
                    </section>
                    <section className="pt-5 text-sm pl-14 sm:pl-48 sm:text-base">
                        <button
                            className="p-1 border-2 change"
                            onClick={() => dialogRef.current[0]?.showModal()} 
                        >
                            Change Photo
                        </button>
                    </section>
                </div>

                <div className="w-full h-20 p-4 mb-2">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        className="w-full h-full border-2 border-gray-600 border-solid peer"
                        onChange={(e) => setUsername(e.target.value)}
                        defaultValue={state?.currentUser?.Username}
                    />
                    {state.currentUser?.Username !== username && (
                        <button onClick={handleUpdateUsername} className="z-50 block">
                            Save
                        </button>
                    )}
                </div>

                <div className="w-full h-20 p-4 mt-4">
                    <label htmlFor="fullname">Fullname:</label>
                    <input
                        type="text"
                        id="fullname"
                        onChange={(e) => setFullname(e.target.value)}
                        className="w-full h-full border-2 border-gray-600 border-solid peer"
                        defaultValue={state?.currentUser?.Fullname}
                    />
                    {state.currentUser?.Fullname !== fullname && (
                        <button onClick={handleUpdateFullname} className="z-50 block">
                            Save
                        </button>
                    )}
                </div>

                <div className="flex w-full gap-4 p-3 mt-5">
                    <p className="pt-2 w-max">Password:</p>
                    <button className="p-2 border-2 rounded-2xl" onClick={()=>{
                        dialogRef.current[1].showModal();
                    }}>Update</button>
                    <dialog className="absolute   md:translate-x-[-50%]" id="PasswordDialog" ref={(e) =>{
                return dialogRef.current[1]=e
            }}>
                <div className=''>
             <form onSubmit={(e)=>{ChangePassword(e)}}>
                <input type="password" name='oldpassword' className='p-1 m-4 border-b-4' placeholder='oldPassword'/><br></br>
                <input type="password" name='newpassword'  className='p-1 m-4 border-b-4'  placeholder='NewPassword'/><br></br>
                <input type="password" name='confirmpassword'  className='p-1 m-4 border-b-4'  placeholder='ConfirmPassword'/><br></br>
                <div className='flex justify-evenly'>
                <button>submit</button>
                <button
                        className="p-4 border-b-2"
                        onClick={(e) => {
                            e.preventDefault()
                            dialogRef.current[1].close();
                        }}
                    >
                        Cancel
                    </button>
                    </div>
             </form>
             </div>
             
            </dialog>
                </div>

                <div className="flex p-2">
                    Private Mode:
                    <Togglebutton />
                </div>
                <div className="flex pl-3">
                    <p className="pt-3">DarkMode:</p>
                    <Darkmode />
                </div>
                <div>
                <button onClick={async()=>{
              const data= await apiRequest('GET',logoutRoute);
              if(data.status){
                sessionStorage.clear()
               dispatch(signOutSuccess());
               localStorage.clear()
               navigate("/login");
              }
               }}>Log Out</button>
                </div>
            </section>
        </div>
    );
}
