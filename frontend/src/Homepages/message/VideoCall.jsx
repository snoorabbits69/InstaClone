import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

export default function VideoCall() {
    const { id } = useParams();
    const localRef = useRef(null);
    const remoteRef = useRef(null);
    const peerRef = useRef(null);
    const socketRef = useRef(null);
    
    useEffect(() => {
        socketRef.current = io('http://localhost:3000/');

        socketRef.current.emit('join-chat', { room: id });

        peerRef.current = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' } // Google's STUN server
            ]
        });

        peerRef.current.onicecandidate = (event) => {
            if (event.candidate) {
                socketRef.current.emit('ice-candidate', { room: id, candidate: event.candidate });
            }
        };

        peerRef.current.ontrack = (event) => {
            remoteRef.current.srcObject = event.streams[0];
        };

        async function getLocalStream() {
            const localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            localRef.current.srcObject = localStream;

            localStream.getTracks().forEach(track => {
                peerRef.current.addTrack(track, localStream);
            });
        }

        getLocalStream();

        socketRef.current.on('incoming:call', async ({ offer }) => {
            await peerRef.current.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await peerRef.current.createAnswer();
            await peerRef.current.setLocalDescription(answer);
            socketRef.current.emit('call:accepted', { room: id, answer });
        });

        socketRef.current.on('call:accepted', async ({ answer }) => {
            await peerRef.current.setRemoteDescription(new RTCSessionDescription(answer));
        });

        socketRef.current.on('ice-candidate', async ( candidate ) => {
            if (candidate) {
                await peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
            }
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [id]);

    async function startCall() {
        const offer = await peerRef.current.createOffer();
        await peerRef.current.setLocalDescription(offer);
        socketRef.current.emit('user:call', { room: id, offer });
    }

    return (
        <div>
            <video ref={localRef} autoPlay muted style={{ transform: 'scaleX(-1)' }} />
            <video ref={remoteRef} autoPlay />
            <button onClick={startCall}>Call</button>
        </div>
    );
}
