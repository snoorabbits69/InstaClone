import { useDispatch, useSelector } from 'react-redux'
import GetUserfromId from './../hooks/GetUserfromId';
import { useState,useEffect } from 'react';
import apiRequest from '../Components/axios';
import { acceptFollowerRoute, cancelFollowerRoute, GetUserfromIdRoute } from '../../utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';
import {  updateUserRequests } from '../Redux/Slice/Userslice';
export default function Notifications() {
  const state=useSelector((state)=>state.user)
    let [totalrequest,settotalrequest]=useState([])
    let [accept,setaccept]=useState(false)
    let dispatch=useDispatch()
    let navigate=useNavigate()
    let {User,Loading}=GetUserfromId(state.currentUser._id)
  
    useEffect(() => {
      const getUser = async () => {
        if(User){
        const userRequests = await Promise.all(
          User.Account.Requests.map(async (req) => {
            const api = GetUserfromIdRoute(req.id);
            const data = await apiRequest('GET', api);
            return data.user;
          })
        );
    
        // Filter out undefined or null users if needed
        const validUsers = userRequests.filter((user) => user);
    
        // Update state with all valid users
        settotalrequest((prev) => [...prev, ...validUsers]);
        }
      };
    
      getUser();
    }, [User]);
     
async function acceptRequest(id){
console.log(id)
const  data  = await apiRequest('POST', acceptFollowerRoute(state.currentUser._id), {
  id: id,
});
if(data.status){
dispatch(updateUserRequests(id))
setaccept(true)
}
}
  return (
   
    <div className="h-[94vh]   lg:w-96 lg:ml-96">
<section className="flex flex-col gap-2">
  Notifications
  <div className="flex-col pt-6">
    {totalrequest.length>0?totalrequest.map((User)=>{
      return <div key={User.Username} className="flex items-center gap-2 p-2 transition-all hover:shadow-lg">
                              <button className='flex items-center gap-2' onClick={() =>{ 
                                 
                              
                                   navigate(`/profile/${User.Username}`)
                                    }}>
                                  <img src={User.avatarImage} className='w-12 h-12 rounded-full' alt={`${User.Username}'s avatar`} />
                                  <section className="text-sm">
                                      <p>{User.Username}</p>
                                      <p>{User.Fullname}</p>
                                  </section>
                              </button>
                              <section className="flex gap-2 ml-auto">
                                  {/* <FollowButton currentUser={User} setcurrentUser={setUser} /> */}
                                  <button onClick={()=>{
                                    acceptRequest(User._id)
                                    }}>{accept?'accepted':'accept'}</button>
                              { !accept &&     <button onClick={async ()=>{
                                    const  data  = await apiRequest('POST', cancelFollowerRoute(state.currentUser._id), {
                                      id: User._id,
                                    });
                                    if(data.status){
                                      dispatch(updateUserRequests(User._id))
                                      }
                                    }}>cancel</button>
                                  }
                              </section>
                          </div>
    }):"No Notifications"}
  </div>
</section>
    </div>
  )
}
