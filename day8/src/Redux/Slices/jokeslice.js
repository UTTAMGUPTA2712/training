import { createSlice } from "@reduxjs/toolkit";
import { fetchJoke } from "../Reducers/jokeslice";

const initialValue = {
    joke: "",
};
export const jokeSlice = createSlice({
    name: "joke",
    initialState: initialValue,
    reducer: {
        addjoke: (state, action) => {
            state.joke = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchJoke.fulfilled, (state, action) => {
            action.pending = false;
            state.joke = action.payload;
        });
        builder.addCase(fetchJoke.rejected, (state, action) => {
            action.pending = false;
            action.error = "JOKE API REJECTED";
        });
        builder.addCase(fetchJoke.pending, (state, action) => {
            action.pending = true;
        });
    },
});
export const { addjoke } = jokeSlice.actions;
export default jokeSlice.reducer;
