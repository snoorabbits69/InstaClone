import React, { useState } from "react";
import { 
  FaMicrophone, 
  FaMicrophoneSlash, 
  FaVideo, 
  FaVideoSlash,
  FaPhone,
  FaUsers,
  FaCog,
  FaCommentAlt
} from "react-icons/fa";
import { TbScreenShare,TbScreenShareOff } from "react-icons/tb";

import VideoControl from './VideoControl';

export default function VideoControls({values} ) {

  const { isMicOn, toggleaudio, isVideoOn, isScreenOn, switchMedia,toggleVideo,endCall }=values
  
    return (
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center gap-4 p-6 bg-gradient-to-t from-black/50 to-transparent animate-fade-in">
        <div className="flex items-center gap-4 p-4 rounded-full backdrop-blur-md bg-black/30">
          <VideoControl 
            icon={isMicOn ? <FaMicrophone size={24} /> : <FaMicrophoneSlash size={24} />}
            onClick={toggleaudio}
            active={isMicOn}
          />
          <VideoControl 
            icon={isScreenOn ? <TbScreenShare size={24} /> : <TbScreenShareOff size={24} />}
            onClick={switchMedia}
            active={!isScreenOn}
          />
          <VideoControl 
            icon={isVideoOn ? <FaVideo size={24} /> : <FaVideoSlash size={24} />}
            onClick={toggleVideo}
            active={isVideoOn}
          />
          <VideoControl  icon={<FaCommentAlt size={24} />} onClick={() => {}} />
          {/* <VideoControl  icon={<FaUsers size={24} />} onClick={() => {}} />
          <VideoControl  icon={<FaCog size={24} />} onClick={() => {}} /> */}
          <VideoControl icon={<FaPhone size={24} />} onClick={endCall} danger />
        </div>
      </div>
    )
}
