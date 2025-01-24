import  { useContext, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Socketcontextprovider from '../../context/Socketcontext'
import io from 'socket.io-client'
export default function VideoCall() {
    const {id}=useParams()
    const localref=useRef()
const Peer=useRef()
const socketref=useRef()
    useEffect(()=>{
        socketref.current=io("http://localhost:3000/")
        socketref.current.emit('join-chat',{room:id,user:'user'})
        Peer.current=new RTCPeerConnection();
async function getLocalStream(){
    const localstream=await navigator.mediaDevices.getUserMedia({audio:true,video:true});
    localref.current.srcObject=localstream
}
getLocalStream()
return ()=>{
    socketref.current.disconnect();
}
    },[])
    async function startCall(){
const offer=await Peer.current.createOffer();
await Peer.current.setLocalDescription(offer)
socketref.current.emit('user:call',{room:id,offer:offer})
    }
  return (
    <div>
     
    <video ref={localref} autoPlay muted style={{transform:'scaleX(-1)'}}/>
   <button onClick={startCall}>call</button>
    </div>
  )
}
