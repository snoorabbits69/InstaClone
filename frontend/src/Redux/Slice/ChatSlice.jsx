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
  let newchats=[...state.chats]
  if(!newchats.some((chat)=>chat._id==action.payload._id)){
 newchats.push(action.payload)
  }
 state.chats=newchats
 },
 UpdateLatestMessage: (state, action) => {
  let updatedChats = state.chats.map((chat) => {
      if (chat._id === action.payload.id) {
          chat.latestMessage = action.payload.latestMessage;
      }
      return chat;
  });

  updatedChats.sort((a, b) => {
      const dateA = new Date(a.latestMessage?.createdAt || 0);
      const dateB = new Date(b.latestMessage?.createdAt || 0);
      return dateB - dateA;
  });

  state.chats = updatedChats;
},
UpdateChatUsers:(state,action)=>{
  state.selectedChat=action.payload
  let updatedChats = state.chats.map((chat) => {
    if (chat._id === action.payload._id) {
        return {...chat,...action.payload}
    }
    return chat;
});
state.chats=updatedChats

}

    
  },
});

export const { chatStart, setUser, setNotifications, setChats,UpdateLatestMessage,addChat,UpdateChatUsers } = chatSlice.actions;
export default chatSlice.reducer;
