
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import authReducer from "../slice/authSlice";
import resumeReducer from "../slice/resumeSlice";
const persistconfig = {
    key: "root",
    version: 1,
    storage,
};
const reducers = combineReducers({
    auth: authReducer,
    resume: resumeReducer,
});
const persist = persistReducer(persistconfig, reducers);
const store = configureStore({
    reducer: persist,
});

export default store;