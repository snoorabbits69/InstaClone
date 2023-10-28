import { useState } from 'react'
import Logo1 from './assets/logo.png'
import Logo2 from './assets/log2.png'
import Login from './pages/Login'
import Register from "./pages/Register"
import Home from './pages/Home'
import SetProfile from './pages/SetProfile'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"

function App() {


  return (
   <Router>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/Profile" element={<SetProfile/>}/>
    </Routes>
   </Router>
  )
}

export default App
