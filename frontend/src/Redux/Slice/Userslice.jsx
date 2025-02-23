import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutStart: (state) => {
      state.loading = true;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    UpdateAvatarImage:(state,action)=>{
      state.currentUser.avatarImage=action.payload;
    },
    updateUserName:(state,action)=>{
state.currentUser.Username=action.payload
    },
    updateFullName:(state,action)=>{
      state.currentUser.Fullname=action.payload
          },
    updatePrivateAccount:(state,action)=>{
      state.currentUser.Account.private=!state.currentUser.Account.private
      },
    updateUserRequests: (state, action) => {
    let currentUserRequests = [...state.currentUser.Account.Requests];

    currentUserRequests = currentUserRequests.filter(request => request.id !== action.payload);

    console.log(currentUserRequests);

    return {
        ...state,
        currentUser: {
            ...state.currentUser,
            Account: {
                ...state.currentUser.Account,
                Requests: currentUserRequests,
            },
        },
    };
},


  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
  UpdateAvatarImage,
  updatePrivateAccount,
  updateUserName,
  updateFullName,
 updateUserRequests,
} = userSlice.actions;

export default userSlice.reducer;
