import { createSlice } from "@reduxjs/toolkit";

const initalValue = {
    note: [],
};
export const noteSlice = createSlice({
    name: "note",
    initialState: initalValue,
    reducers: {
        add: (state, action) => {
            state.note.push(action.payload);
        },
        edit: (state, action) => {
            for (let note of state.note) {
                if (note.id === action.payload.data) {
                    note.title = action.payload.title;
                    note.content = action.payload.content;
                }
            }
        },
        deletenote: (state, action) => {
            state.note = state.note.filter((note) => note.id !== action.payload);
        },
    },
});
export const { add, edit, deletenote } = noteSlice.actions;
export default noteSlice.reducer;
