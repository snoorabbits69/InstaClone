import React, { useState } from 'react';
import axios from 'axios';
import { AddUserstoChatroute, CreateGroupRoute } from '../../../utils/ApiRoutes';
import GetUsers from '../../hooks/GetUsers';
import { useDispatch } from 'react-redux';
import { addChat, UpdateChatUsers } from '../../Redux/Slice/ChatSlice';
import apiRequest from '../../Components/axios';

export default function AddUsers({chatId, setadduserdialog }) {
  const [chatdata, setchatdata] = useState({ chatId:chatId, users: [] });
  const [search, setsearch] = useState("");
  const { User } = GetUsers(search);
 
let dispatch=useDispatch();
  const handleSearchChange = (e) => {
    setsearch(e.target.value);
  };

  const handleUserAdd = (user) => {
    const newUser = {
      id: user._id,
      Username: user.Username,
      Fullname: user.Fullname,
    };

    setchatdata((prev) => ({
      ...prev,
      users: [...prev.users, newUser],
    }));
  };

  const handleUserRemove = (userId) => {
    setchatdata((prev) => ({
      ...prev,
      users: prev.users.filter((user) => user.id !== userId),
    }));
  };

  const handleCancel = () => {
    setadduserdialog(false);
    setsearch('');
    setchatdata({ chatname: "", users: [] });
  };

  const handleCheckboxChange = (e, user) => {
    if (e.target.checked) {
      handleUserAdd(user);
    } else {
      handleUserRemove(user._id);
    }
  };
const addUser=async()=>{
const data=await apiRequest("POST",AddUserstoChatroute,chatdata)
if(data.status){
  dispatch(UpdateChatUsers(data.chat))
  setadduserdialog(false)
  setsearch('');
    setchatdata({ chatname: "", users: [] });
}

}
  

  return (
    <div className="relative w-screen py-3 sm:max-w-xl sm:mx-auto">
      <div className="relative px-4 py-10 mx-8 bg-white shadow md:mx-0 rounded-3xl sm:p-10">
        <div className="max-w-md mx-auto">
              <div className="flex flex-col">
        {   chatdata.users.length>0 &&   <>
          <label className="leading-loose">Users</label>
                <div className="flex w-full h-10 gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none">
                  {chatdata.users.map((user, i) => (
                    <p key={i} className="text-sm border-2 rounded-full">
                      {user.Fullname}
                      <button
                        onClick={() => handleUserRemove(user.id)}
                      >
                        <sup>x</sup>
                      </button>
                    </p>
                  ))}
                </div>
                </>
}
              </div>

              <input
                type="text"
                value={search}
                className="w-full h-10 mt-2 border-2"
                id="forsearch"
                placeholder="search Users"
                onChange={handleSearchChange}
              />

              <div className="overflow-scroll h-28">
                {User?.map((user) => (
                  <button
                    className="z-50 w-72"
                    key={user.Username}
                  >
                    <section className="flex">
                      <div className="flex gap-3 pl-10 transition-all rounded-lg hover:bg-gray-200">
                        <img
                          src={user.avatarImage}
                          className="w-10 h-10 mt-2 rounded-full"
                        />
                        <section>
                          <p className="text-lg">{user.Fullname}</p>
                        </section>
                      </div>
                      <input
                        type="checkbox"
                        checked={chatdata?.users?.some((curruser) => curruser.id === user._id)}
                        onChange={(e) => handleCheckboxChange(e, user)}
                        className="mb-4 ml-2"
                      />
                    </section>
                  </button>
                ))}
              </div>

              <div className="flex items-center pt-4 space-x-4 text-sm">
                <button
                  className="flex items-center justify-center w-full px-4 py-3 text-gray-900 rounded-md focus:outline-none"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="flex items-center justify-center w-full px-4 py-3 text-white bg-blue-500 rounded-md focus:outline-none"
                  onClick={addUser}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
    
  );
}
