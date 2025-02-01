import React, { useContext, useEffect }  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeSidebar from './Sidebar/HomeSidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import SetProfile from './pages/SetProfile';
import Explore from './Homepages/Explore';
import Reels from './Homepages/Reels';
import Message from './Homepages/message/Message';
import Profile from './Homepages/Profile Component/Profile';
import './App.css';
import PrivateRoute from './Components/PrivateRoute';
import { useSelector } from 'react-redux';
import EditProfile from './Homepages/Profile Component/EditProfile';
import Post from './pages/Post';
import ChatBox from './Homepages/message/ChatBox';
import VideoCall from './Homepages/message/VideoCall';

import { ToastContainer } from 'react-toastify';
import { Socketcontext } from './context/Socketcontext';
function App() {
  const state = useSelector((state) => state.user);
  const {socket}=useContext(Socketcontext)
  
useEffect(()=>{
  if(state.currentUser){
    socket.emit("isonline",state.currentUser._id)
  }
},[socket,state.currentUser])

  const shouldRenderSidebar = !location.pathname.startsWith("/video");
  
  return (
    <section className="h-auto text-black dark:text-white ">
    <Router>
      {state.currentUser ?shouldRenderSidebar && <HomeSidebar />: null}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
        <Route path="/" element={<PrivateRoute/>}>
          <Route path="/" element={<Home/>}>  </Route>
          </Route>
         <Route path="explore" element={<Explore/>}></Route>
            <Route path="/message" element={<Message />} >
            <Route path=":user" element={ChatBox}/>
            </Route>
            <Route path='/video/:id' element={<VideoCall/>}/>
            <Route path="/reels" element={<Reels />} /> 
        <Route path="/setprofile" element={<SetProfile/>} />
        </Route>
        <Route path="/post/:postid" element={<Post/>}/>
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>
    </Router>
    <ToastContainer/>
    </section>
  );
}

export default App;
