import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import GetUsers from '../hooks/GetUsers';
export default function Search({setShowSearch}) {
  const navigate=useNavigate();
const [inputValue, setInputValue] =useState('');
 let Users= GetUsers(inputValue);
const handleInputChange = (event) => {
      setInputValue(event.target.value);
  console.log(Users);
}
  return (
    <div className="flex flex-col w-full h-full rounded-xl " >
<section>
  <input type="text" className='h-10 mt-12 border-2 border-gray-400 lg:mx-8 w-80 rounded-xl' onChange={
    (e)=>{handleInputChange(e)}}
    />
</section>
<section className="pt-5 rounded-lg w-80">
{Users.User.map((user)=>{
  return<button className='z-50 w-80'
   onClick={()=>{
    navigate(`/profile/${user.Username}`);
if(window.innerWidth>500){
  setShowSearch(false);
}
  
  }} key={`${user.Username}`}> <div className="flex gap-3 pl-10 transition-all rounded-lg hover:bg-gray-500">
    <img src={user.avatarImage} className="w-10 h-10 mt-2 rounded-full"/>
    <section>
    <p className="">{user.Username}</p>
    <p className='text-lg'>{user.Fullname}</p>
    </section>
  </div>
  </button>
})}
</section>
    </div>
  )
}
