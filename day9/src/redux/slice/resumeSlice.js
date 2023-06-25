import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    users:{}
};
export const resumeSlice = createSlice({
    name: "resume",
    initialState: initialValue,
    reducers: {
        login: (state, action) => {
                const cur=action.payload;
                const resume=state.users[cur]||[];
                state.users[cur]=[...resume]
        },
        addResume:(state,action)=>{
            state.users[action.payload.user].push(action.payload.data)
        },
        deleter:(state,action)=>{
            state.users[action.payload.user]=state.users[action.payload.user].filter((c,cv)=>cv!=action.payload.index)
        },
        templateUpdater:(state,action)=>{
            state.users[action.payload.user][action.payload.index].templatedata=action.payload.value
        },
        formUpdater: (state,action)=>{
            state.users[action.payload.user][action.payload.index]=action.payload.form
        }
    },
});
export const { login, addResume,deleter,templateUpdater,formUpdater } = resumeSlice.actions;
export default resumeSlice.reducer;
