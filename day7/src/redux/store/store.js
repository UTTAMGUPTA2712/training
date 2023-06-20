import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "../reducer/noteslice";

export const noteStore = configureStore({
    reducer: {
        note: noteReducer,
    },
});
