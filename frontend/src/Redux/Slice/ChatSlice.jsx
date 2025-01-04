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
      state.chats = action.payload;
    },
  },
});

export const { chatStart, setUser, setNotifications, setChats } = chatSlice.actions;
export default chatSlice.reducer;
