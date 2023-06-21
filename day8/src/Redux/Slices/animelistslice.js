import { createSlice } from "@reduxjs/toolkit";
import { fetchAnimeList } from "../Reducers/animelistreduce";

const initialValue = {
    animeList: [],
};
export const animeListSlice = createSlice({
    name: "animeList",
    initialState: initialValue,
    reducer: {
        addAnimeList: (state, action) => {
            state.animeList = action.payload.data;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAnimeList.fulfilled, (state, action) => {
            action.pending = false;
            state.animeList = action.payload.data;
        });
        builder.addCase(fetchAnimeList.rejected, (state, action) => {
            action.pending = false;
            action.error = "ANIMELIST API REJECTED";
        });
        builder.addCase(fetchAnimeList.pending, (state, action) => {
            action.pending = true;
        });
    },
});
export const { addAnimeList } = animeListSlice.actions;
export default animeListSlice.reducer;
