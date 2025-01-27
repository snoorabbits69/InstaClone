import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import sessionStorage from "redux-persist/lib/storage/session"; // sessionStorage for specific slices
import UserReducer from "./Slice/Userslice";
import ChatReducer from "./Slice/ChatSlice";
import CommentReducer from "./Slice/CommentSlice";
const userPersistConfig = {
  key: "user",
  storage,
  blacklist: ["comments"]
};

const chatPersistConfig = {
  key: "chat",
  storage: sessionStorage,
  blacklist: ["comments"]
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, UserReducer),
  chat: persistReducer(chatPersistConfig, ChatReducer),
  comment:CommentReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
