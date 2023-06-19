import { configureStore } from "@reduxjs/toolkit";
import  arrReducer  from "../action/slice";

export const Store = configureStore({
    reducer: {
        arr: arrReducer,
    },
});