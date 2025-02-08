import React, { useContext, useRef, useState, useEffect } from 'react';
import { CiImageOn } from "react-icons/ci";
import { Socketcontext } from '../../context/Socketcontext';
import apiRequest from '../../Components/axios';
import { SendimagemessageRoute, SendMessageRoute } from '../../../utils/ApiRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateLatestMessage } from '../../Redux/Slice/ChatSlice';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RxCross2 } from 'react-icons/rx';
import { addMessage } from '../../Redux/Slice/MessageSlice';
import Picker from "@emoji-mart/react"
import data from '@emoji-mart/data'
import { BsEmojiSmileFill } from "react-icons/bs";
export default function Sendmessage() {
    const inputref = useRef();
    const imageref = useRef();
    const { socket } = useContext(Socketcontext);
    const [loading, setloading] = useState(false);
    const [input, setinput] = useState("");
    const [images, setimages] = useState([]);
    const [showemoji,setshowemoji]=useState(false)
    const dispatch = useDispatch();
    const { _id } = useSelector((state) => state.chat.selectedChat);
    const messages = useSelector((state) => state.message.messages); 
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(() => {
        console.log("Images updated:", images);
    }, [images]);

    function addemoji(emoji){
        setinput((prev)=>prev+emoji.native)
        }

    const sendmessage = async () => {
        if (loading) return;
        setloading(true);
        try {
            if (images.length > 0) {
                const formdata = new FormData();
                images.forEach((image) => formdata.append("files", image));
                formdata.append("chatId", _id);

                const data = await apiRequest("POST", SendimagemessageRoute, formdata);

                if (data.status) {
                  setimages( [])
                  data.messages.forEach(message => {
                    dispatch(addMessage(message));
                });
                

                    
                    dispatch(UpdateLatestMessage({ 
                        id: _id, 
                        latestMessage: data.messages[data.messages.length - 1] 
                    }));

                    socket.emit("sendMessage", data.messages);
                    
                }
            }

            if (input.trim() !== "") {
                inputref.current.readOnly = true;

                const data = await apiRequest("POST", SendMessageRoute, {
                    chatId: _id,
                    content: input,
                });

                if (data.status) {
                    dispatch(addMessage(data.message))
                    dispatch(UpdateLatestMessage({ id: _id, latestMessage: data.message }));
                    socket.emit("sendMessage", data.message);
                    setinput("");
                }

                inputref.current.readOnly = false;
            }
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setloading(false);
        }
    };

    return (
        <div className="relative p-3 bg-gray-100 rounded-tl-none rounded-tr-none h-15 rounded-xl dark:bg-gray-800">
            <div className="flex gap-2 bottom-1">
                {images.length > 0 && images.map((image, i) => (
                    <div key={i} className='relative w-12 h-12'>
                        <img src={URL.createObjectURL(image)} className='w-12 h-12 ' alt="preview" />
                        <button onClick={() => {
                            setimages(prev => prev.filter((_, index) => index !== i));
                        }}>
                            <RxCross2 className="absolute border-2 rounded-full -top-3 bottom-20 left-10"/>
                        </button>
                    </div>
                ))}
            </div>
            <div className="relative flex items-center">
               {showemoji && <div className='absolute bg-white bottom-12 '>
                <Picker data={data} onEmojiSelect={addemoji}/>
               
</div>   
             }       
             <button className='text-xl' onClick={()=>{
                setshowemoji(true)
             }}>
 <BsEmojiSmileFill/>
                </button>     
            
                <div className="flex flex-grow p-2">
                    <input 
                        className="flex-grow p-5 text-sm text-gray-700 bg-gray-100 input dark:text-gray-200 focus:outline-none dark:bg-gray-800 rounded-l-md"
                        ref={inputref}
                        type="text" 
                        placeholder="Type your message ..."
                        onFocus={(e)=>{
                            setshowemoji(false)
                        }}
                        onChange={(e) => {
                            setinput(e.target.value);
                            socket.emit("typing", _id);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                sendmessage();
                                e.preventDefault();
                            }
                        }}
                        value={input}
                    />
                      <button 
                    className="p-2 text-2xl text-gray-600 dark:text-gray-200" 
                    onClick={() => imageref.current.click()}
                > 
                    <input 
                        type="file" 
                        accept='image/*' 
                        className="hidden" 
                        onChange={(e) => {
                            if (images.length >= 4) {
                                toast("You can only send 4 images at once", toastOptions);
                            } else {
                                setimages((prev) => [...prev, e.target.files[0]]);
                            }
                        }} 
                        ref={imageref} 
                    />
                    <CiImageOn />
                </button>
                    <button 
                        className="flex items-center justify-center pr-3 text-gray-400 bg-gray-100 dark:bg-gray-800 dark:text-gray-200 rounded-r-md"
                        onClick={sendmessage}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
