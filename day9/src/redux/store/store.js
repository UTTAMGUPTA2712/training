import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"
import authReducer from "../slice/authSlice";
import resumeReducer from "../slice/resumeSlice";
import persistReducer from "redux-persist/es/persistReducer";
const persistconfig = {
    key: "root1",
    version: 11,
    storage,
};
const rootreducers = combineReducers({
    auth: authReducer,
    resume: resumeReducer,
});
const persistsasa = persistReducer(persistconfig, rootreducers);
const store = configureStore({
    reducer:persistsasa,
});
export default store;