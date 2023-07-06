import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
// import shopSlice from "../slice/shopSlice"
import { persistReducer } from "redux-persist"
import shopSlice from "../slice/shopSlice"
const config={
    key:"shop",
    version:1,
    storage
}
const combineReducer=combineReducers({
    shop:shopSlice
})
const persistReduce=persistReducer(config,combineReducer)
export const store=configureStore({
    reducer: persistReduce,
})