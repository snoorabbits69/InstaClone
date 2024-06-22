import { configureStore,combineReducers} from "@reduxjs/toolkit";
import { persistStore,persistReducer } from "redux-persist";
import UserReducer from "./Slice/Userslice";
import storage from 'redux-persist/lib/storage';

const persistconfig={
    key:"root",
    storage,
}
const rootreducers=combineReducers({
    user:UserReducer
})
const persistedReducer=persistReducer(persistconfig,rootreducers);

export const store=configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
})
export const persistor = persistStore(store);