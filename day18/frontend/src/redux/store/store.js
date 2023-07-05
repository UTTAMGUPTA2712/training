import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import authSLice from "../slice/authSLice"
import { persistReducer } from "redux-persist"
const config={
    key:"weatherapp",
    version:1,
    storage
}
const reducerCombined=combineReducers({
    auth:authSLice
})
const persistreduce=persistReducer(config,reducerCombined)
export const store=configureStore({
    reducer:persistreduce
})