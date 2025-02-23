import { useContext, useEffect,useState, useRef,useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Socketcontext } from '../../context/Socketcontext';
import VideoControls from './VideoControls';
import CalcDate from '../../Components/CalcDate';

export default function VideoCall() {
    const { id } = useParams();
    let [Callended,setCallended]=useState(false)
   const Reciever = useMemo(() => new URLSearchParams(window.location.search), []);
    const localRef = useRef(null);
    const remoteRef = useRef(null);
    const peerConnection = useRef(null);
    const { socket } = useContext(Socketcontext);
    const [isMicOn, setIsMicOn] = useState(true);
        const [isVideoOn, setIsVideoOn] = useState(true);
        const [isScreenOn, setIsScreenOn]=useState(false)
        const [callStart, setCallStart] = useState(Date.now());

      
    useEffect(() => {
        const servers = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

        async function setupConnection() {
            const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio:true });
            localRef.current.srcObject = localStream;

            peerConnection.current = new RTCPeerConnection(servers);

            // Add local stream tracks to the peer connection
            localStream.getTracks().forEach(track => {
                peerConnection.current.addTrack(track, localStream);
            });

            // Handle remote stream
            peerConnection.current.ontrack = (event) => {
                remoteRef.current.srcObject = event.streams[0];
            };

            // Send ICE candidates
            peerConnection.current.onicecandidate = (event) => {
                if (event.candidate) {
                    socket.emit('ice-candidate', { room: id, candidate: event.candidate });
                }
            };

            // Automatically trigger the call
            const offer = await peerConnection.current.createOffer();
            await peerConnection.current.setLocalDescription(offer);
            socket.emit('user:call', { room: id, offer });
        }

        setupConnection();

        // Receive an incoming offer
        socket.on('incoming:call', async ({ offer, room }) => {
            if (peerConnection.current) {
                await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
                const answer = await peerConnection.current.createAnswer();
                await peerConnection.current.setLocalDescription(answer);
                socket.emit('call:accepted', { room, answer });
            }
        });

        // Receive an answer
        socket.on('call:answered', async ({ answer }) => {
            if (peerConnection.current) {
                await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
            }
        });
         
        // Handle ICE candidates
        socket.on('ice-candidate', async (candidate) => {
            if (peerConnection.current) {
                try {
                    await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
                } catch (error) {
                    console.error('Error adding received ICE candidate', error);
                }
            }
        });
        function endCall() {
          
          console.log(CalcDate({date:callStart}))
          const stream = localRef.current.srcObject; 
          stream.getTracks().forEach(track => track.stop());
          if (peerConnection) {
              peerConnection.current.getSenders().forEach(sender => sender.track?.stop());
              peerConnection.current.close();
              peerConnection.current = null;
          }
         
          setCallended(true)
      
      
         
      }
       //call end
       socket.on("call:end",endCall)
        socket.on("peer-disconnected",endCall)
       

        return () => {
            socket.off('incoming:call');
            socket.off('call:answered');
            socket.off('ice-candidate');
            socket.off('peer-disconnected');
            socket.off('call:end');
        };
    }, [id,socket]);

   
    const switchMedia = async () => {
      try {
          const newStream = isScreenOn
              ? await navigator.mediaDevices.getDisplayMedia({ video: { cursor: "always" }, audio: true })
              : await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

          localRef.current.srcObject?.getTracks().forEach(track => track.stop());
          localRef.current.srcObject = newStream;

          const senders = peerConnection.current.getSenders();
          newStream.getTracks().forEach((track) => {
              const sender = senders.find(s => s.track?.kind === track.kind);
              if (sender) {
                  sender.replaceTrack(track);
              } else {
                  peerConnection.current.addTrack(track, newStream);
              }
          });

          newStream.getVideoTracks()[0].addEventListener('ended', () => {
              if (isScreenOn) {
                  setIsScreenOn(prev => !prev);
              }
          });

          setIsScreenOn(prev => !prev);

      } catch (error) {
          console.error('Error switching media:', error);
      }
  };
 
  

  
    const [isSwapped, setIsSwapped] = useState(false);
    const handleSwap = () => {
        setIsSwapped(!isSwapped);
      };
      const toggleVideo = () => {
        const videoTrack = localRef.current.srcObject?.getVideoTracks()[0];
        if (videoTrack) {
            videoTrack.enabled = !isVideoOn;  
            setIsVideoOn(prev => !prev);
        }
    };
    
const toggleaudio=()=>{
  const audioTrack=localRef.current.srcObject?.getAudioTracks()[0]
console.log(audioTrack)
  if(audioTrack){
    audioTrack.enabled=!isMicOn
    setIsMicOn(prev=>!prev)
  
  }
}
const endCall=()=>{
  const stream = localRef.current.srcObject; 
  stream.getTracks().forEach(track => track.stop());
  if (peerConnection) {
      peerConnection.current.getSenders().forEach(sender => sender.track?.stop());
      peerConnection.current.close();
      peerConnection.current = null;
  }
  socket.emit("end:call",{room:id})
  setCallended(true)

}
    return (
      <>
      {!Callended?
        <div >
         <div className="relative flex items-center justify-center min-h-screen p-4 bg-neutral-50 dark:bg-slate-900">
     
      <div className="relative w-full h-screen max-w-6xl overflow-hidden border-2 shadow-lg aspect-video rounded-2xl">
        <video
         ref={remoteRef}
         autoPlay
          className="object-cover w-full h-screen transition-all duration-300 ease-in-out md:h-full"
        />

        <div
          className={"absolute cursor-pointer group right-4 top-4"}
          style={{
            width: "20%",
            aspectRatio: "16/9",
          }}
          onClick={handleSwap}
        >
          <div 
          className={"relative w-full h-full transition-transform duration-300 ease-in-out hover:scale-[1.02]"}
>
            <video 
              ref={localRef}
              autoPlay
              alt="Secondary video"
              muted
              className="object-cover w-full h-full transition-all duration-300 rounded-lg shadow-lg"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
              }}
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 transition-opacity duration-300 bg-black rounded-lg opacity-0 group-hover:opacity-20" />
          </div>
        </div>
      </div>
    </div>
            <VideoControls 
  values={{ 
    isMicOn: isMicOn, 
    toggleaudio:toggleaudio, 
    isVideoOn: isVideoOn, 
    switchMedia:switchMedia,
    isScreenOn:isScreenOn,
    toggleVideo:toggleVideo,
    endCall:endCall
  }} 
/>

        </div>: <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center w-full max-w-sm p-8 mx-4 bg-white shadow-lg animate-fade-in rounded-2xl">
        <div className="relative mb-6">
          <div className="flex items-center justify-center w-24 h-24 overflow-hidden bg-gray-200 border-4 border-white rounded-full shadow-lg animate-scale-in">
            <img src={Reciever.get("avatarImage")} className="w-16 h-16 text-gray-400" />
          </div>
        </div>
        
        <div className="w-full space-y-4 text-center">
          <div className="space-y-1">
            <p className="text-sm font-medium tracking-wide text-gray-500">Call ended with</p>
            <h1 className="text-2xl font-semibold text-gray-900">{Reciever.get("username")}</h1>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-gray-600">
           
            <span className="text-sm font-medium"><CalcDate date={callStart}/></span>
          </div>
        </div>
      </div>
    </div>
}
</>
    );
}
