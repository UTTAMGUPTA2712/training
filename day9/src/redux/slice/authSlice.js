import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    isAuth: false,
    phoneNumber: null,
};
export const authSlice = createSlice({
    name: "auth",
    initialState: initialValue,
    reducers: {
        auth: (state) => {
            state.isAuth = true;
        },
        phoneNumberAuthe: (state, action) => {
            console.log("xsuxusgxu");
            state.phoneNumber = action.payload;
        },
    },
});
export const { auth, phoneNumberAuthe } = authSlice.actions;
export default authSlice.reducer;