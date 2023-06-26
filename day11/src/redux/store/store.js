import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducer/authSlice";
import storage  from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const persistconfig={
    key:"login",
    version:1,
    storage,
}
const combinedreducer=combineReducers({
    auth:authReducer
})
const persistRed=persistReducer(persistconfig,combinedreducer)
export const store=configureStore({
    reducer:persistRed
})