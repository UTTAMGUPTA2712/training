import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    currentUser:null,
    users: [],
};
export const resumeSlice = createSlice({
    name: "resume",
    initialState: initialValue,
    reducer: {
        login: (state, action) => {
            let flag=true
            for (let user of state.users) {
                if (action.payload === user.phoneNumber) {
                    state.currentUser = user;
                    flag=false;
                }
            }
            if(flag) {
                state.currentUser={phoneNumber:action.payload,data:[]}
            }
        },
        logout: (state) => {
            for (let user of state.users) {
                if (state.currentUser.phoneNumber === user.phoneNumber) {
                    user = state.currentUser;
                }
            }
        },
        addResume:(state,action)=>{
            state.currentUser.data.push(action.payload)
        }
    },
});
export const { login, logout,addResume } = resumeSlice.actions;
export default resumeSlice.reducer;
