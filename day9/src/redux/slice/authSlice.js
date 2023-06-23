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
            state.phoneNumber = action.payload;
            state.isAuth = false;
        },
        logout:(state)=>{
            state.isAuth = false;
            state.phoneNumber=null;
        }
    },
});
export const { auth, phoneNumberAuthe,logout } = authSlice.actions;
export default authSlice.reducer;