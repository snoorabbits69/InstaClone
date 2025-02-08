import { useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Socketcontext } from '../../context/Socketcontext';

export default function VideoCall() {
    const { id } = useParams();
    const localRef = useRef(null);
    const remoteRef = useRef(null);
    const peerConnection = useRef(null);
    const { socket } = useContext(Socketcontext);

    useEffect(() => {
        const servers = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

        async function setupConnection() {
            const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
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

        return () => {
            socket.off('incoming:call');
            socket.off('call:answered');
            socket.off('ice-candidate');
        };
    }, [id, socket]);

    return (
        <div className="lg:ml-96">
            <video ref={localRef} autoPlay muted style={{ transform: 'scaleX(-1)', width: '300px' }} />
            <video ref={remoteRef} autoPlay style={{ width: '300px' }} />
        </div>
    );
}
