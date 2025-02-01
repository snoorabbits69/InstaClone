import { useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

export default function VideoCall() {
    const { id } = useParams();
    const localref = useRef(null);
    const remoteref = useRef(null);  
    const Peer = useRef(null);
    const socketref = useRef(null);
    const offer = JSON.parse(sessionStorage.getItem("videoCallOffer"));
   
    useEffect(() => {
        const accepted=window.opener.accepted
        console.log(accepted,"accepted")
        socketref.current = io('http://localhost:3000/');
        socketref.current.emit('join-chat', { room: id, user: 'user' });

        Peer.current = new RTCPeerConnection();

        async function getLocalStream() {
            const localstream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            localref.current.srcObject = localstream;

            localstream.getTracks().forEach(track => {
                Peer.current.addTrack(track, localstream);
            });
        }

        getLocalStream();

   if(offer){
    console.log(offer.offer)
   }

        return () => {
            socketref.current.disconnect();
        };
    }, [id, offer]);

    async function startCall() {
        const offer = await Peer.current.createOffer();
        await Peer.current.setLocalDescription(offer);
        socketref.current.emit('user:call', { room: id, offer: offer });

        // Store the offer in sessionStorage for the other participant
        sessionStorage.setItem("videoCallOffer", JSON.stringify(offer));
    }

    return (
        <div>
            <video ref={localref} autoPlay muted style={{ transform: 'scaleX(-1)' }} />
            <video ref={remoteref} autoPlay />
            <button onClick={startCall}>Call</button>
        </div>
    );
}
