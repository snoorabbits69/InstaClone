import { createContext, useEffect } from "react";
import { io } from 'socket.io-client';
export const Socketcontext=createContext()
const socket = io("http://localhost:3000/");
export default function Socketcontextprovider({children}){
useEffect(()=>{
socket.connect()
return ()=>socket.disconnect();
},[])
    return <Socketcontext.Provider value={{socket}}>
    {children}
    </Socketcontext.Provider>

}


