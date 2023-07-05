import { createSlice } from "@reduxjs/toolkit"

const initialValue={
    userAuth:null
}
export const authSlice=createSlice({
    name:"auth",
    initialState:initialValue,
    reducers:{
        saveAuth:(state,action)=>{
            state.userAuth=action.payload
        },
        logout:(state)=>{
            state.userAuth=null
        },
    }
})
export const {saveAuth,logout}=authSlice.actions
export default authSlice.reducer
