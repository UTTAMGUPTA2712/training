import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import authReducer from "../reducer/authslice"
import themeReducer from "../reducer/themeslice"
import { persistReducer } from "redux-persist"
const configDetail={
    key:"instagram",
    version:1,
    storage
}
const combinedReduce=combineReducers({
    auth:authReducer,
    theme:themeReducer
})
const persistReduce=persistReducer(configDetail,combinedReduce)
export const store=configureStore({
    reducer:persistReduce,
})