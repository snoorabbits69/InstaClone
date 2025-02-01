import React, { useState } from 'react';
import axios from 'axios';
import { CreateGroupRoute } from '../../../utils/ApiRoutes';
import GetUsers from './../../hooks/GetUsers';
import { useDispatch } from 'react-redux';
import { addChat } from '../../Redux/Slice/ChatSlice';
import apiRequest from '../../Components/axios';

export default function Addgroup({ setdialogstatus }) {
  const [chatimg, setchatimg] = useState();
  const [chatdata, setchatdata] = useState({ chatname: "", users: [] });
  const [search, setsearch] = useState();
  const { User } = GetUsers(search);
const dispatch=useDispatch();
  const handleChatImageChange = (e) => {
    setchatimg(e.target.files[0]);
  };

  const handleChatNameChange = (e) => {
    setchatdata((prev) => ({ ...prev, chatname: e.target.value }));
  };

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
    setdialogstatus(false);
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

  const createGroup = async () => {
    const Newgroup = new FormData();
    Newgroup.append('file', chatimg);
    Newgroup.append('chatname', chatdata.chatname);
    const userids = chatdata.users.map((user) => user.id);
    Newgroup.append('users', userids);

   

      // const { data } = await axios.post(CreateGroupRoute, Newgroup, {
      //   withCredentials: true,
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
const data=await apiRequest('POST',CreateGroupRoute,Newgroup)
console.log(data)
    if(data.status){
      dispatch(addChat(data.chat))
      setdialogstatus(false)

    }
    
  };

  return (
    <div className="relative w-screen py-3 sm:max-w-xl sm:mx-auto">
      <div className="relative px-4 py-10 mx-8 bg-white shadow md:mx-0 rounded-3xl sm:p-10">
        <div className="max-w-md mx-auto">
          <div className="flex items-center space-x-5">
            <div className="self-start block pl-2 text-xl font-semibold text-gray-700">
              <h2 className="leading-relaxed">Create Group Chat</h2>
            </div>
          </div>

          <div className="py-8 space-y-2 text-base text-gray-700 sm:text-lg sm:leading-7">
            <div className="flex flex-col">
              <input
                type="file"
                className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md"
                onChange={handleChatImageChange}
              />
            </div>

            <div className="space-y-4 text-base text-gray-700 sm:text-lg sm:leading-7">
              <div className="flex flex-col">
                <label className="leading-loose">Chat Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-900 sm:text-sm focus:outline-none"
                  placeholder="Chatname"
                  onChange={handleChatNameChange}
                />
              </div>

              <div className="flex flex-col">
           
           { chatdata.users.length>0 &&    <>
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
                className="w-full mt-2 border-2"
                id="forsearch"
                placeholder="Search Users"
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
                  onClick={createGroup}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
