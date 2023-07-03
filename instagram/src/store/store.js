import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import authReducer from "../reducer/authslice"
import { persistReducer } from "redux-persist"
// setting configuaration of persistor
const configDetail = {
    key: "instagram",
    version: 1,
    storage
}
// combining all the reducers 
const combinedReduce = combineReducers({
    auth: authReducer,
})
// attaching the reducer to persister
const persistReduce = persistReducer(configDetail, combinedReduce)
// exporting store 
export const store = configureStore({
    reducer: persistReduce,
})