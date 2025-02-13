import  {  useEffect }  from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import StartVideocall from './Homepages/message/StartVideocall';
import Layout from './Layout';
import AddtoStory from './pages/Stories/AddtoStory';
import DisplayStory from './pages/Stories/DisplayStory';
function App() { 
  return (
    <section className="h-auto text-black dark:text-white ">
    <Router>
      <Routes>
        <Route element={<Layout/>}>
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
            <Route path='/startvideocall/:id' element={<StartVideocall/>}  />
            <Route path='/video/:id' element={<VideoCall/>}/>
            <Route path="/reels" element={<Reels />} /> 
        <Route path="/setprofile" element={<SetProfile/>} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="addtostory" element={<AddtoStory/>}/>
        <Route path="story/:id" element={<DisplayStory/>}/>
        </Route>
        <Route path="/post/:postid" element={<Post/>}/>
        <Route path="/profile/:username" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
    <ToastContainer/>
    </section>
  );
}

export default App;
