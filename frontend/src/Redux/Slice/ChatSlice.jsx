import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  selectedChat: null,
  users: [], 
  notification: [],
  chats: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    chatStart: (state, action) => {
      state.selectedChat = action.payload; 
    },
    setUser: (state, action) => {
      state.users = [...state.users, action.payload];
  },
  
    setNotifications: (state, action) => {
      state.notification = action.payload; 
    },
    setChats: (state, action) => {
      const newChats = action.payload.filter(newChat => 
        !state.chats.some(existingChat => existingChat.id === newChat.id)
      );
      state.chats = [...state.chats, ...newChats];
    },
 addChat:(state,action)=>{
state.chats=state.chats.push(action.payload)
 },
    UpdateChats: (state, action) => {
      
      let updatedchats=state.chats.map((chat)=>{
        if(chat._id===action.payload.id){
          
          chat.latestMessage=action.payload.latestMessage
        }
        return chat
      })
     state.chats=updatedchats
    }
    
  },
});

export const { chatStart, setUser, setNotifications, setChats,UpdateChats,addChat } = chatSlice.actions;
export default chatSlice.reducer;
