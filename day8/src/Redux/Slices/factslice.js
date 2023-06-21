import { createSlice } from "@reduxjs/toolkit";
import { fetchFact } from "../Reducers/factreduce";

const initialValue = {
    Fact: "",
};
export const FactSlice = createSlice({
    name: "Fact",
    initialState: initialValue,
    reducer: {
        addFact: (state, action) => {
            state.Fact = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFact.fulfilled, (state, action) => {
            action.pending = false;
            state.Fact = action.payload;
        });
        builder.addCase(fetchFact.rejected, (state, action) => {
            action.pending = false;
            action.error = "FACT API REJECTED";
        });
        builder.addCase(fetchFact.pending, (state, action) => {
            action.pending = true;
        });
    },
});
export const { addFact } = FactSlice.actions;
export default FactSlice.reducer;
