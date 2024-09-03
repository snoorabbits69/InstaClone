import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeSidebar from './Sidebar/HomeSidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import SetProfile from './pages/SetProfile';
import Explore from './Homepages/Explore';
import Reels from './Homepages/Reels';
import Message from './Homepages/Message';
import Profile from './Homepages/Profile Component/Profile';
import './App.css';
import PrivateRoute from './Components/PrivateRoute';
import { useSelector } from 'react-redux';
import EditProfile from './Homepages/Profile Component/EditProfile';
import Post from './pages/Post';

function App() {
  const state = useSelector((state) => state.user);
  return (
    <Router>
      {state.currentUser ? <HomeSidebar /> : null}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home/>}>  </Route>
         <Route path="explore" element={<Explore/>}></Route>
            <Route path="/message" element={<Message />} />
            <Route path="/reels" element={<Reels />} /> 
        <Route path="/setprofile" element={<SetProfile/>} />
        </Route>
        <Route path="/post/:postid" element={<Post/>}/>
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>
    </Router>
  
  );
}

export default App;
