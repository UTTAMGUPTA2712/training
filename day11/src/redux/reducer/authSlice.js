import { createSlice } from "@reduxjs/toolkit"

const initialValue={
    userAuth:null
}
export const AuthSlice=createSlice({
    name:"auth",
    initialState:initialValue,
    reducers:{
        saveUserAuth:(state,action)=>{
            state.userAuth=action.payload
        },
        logout:(state)=>{
            state.userAuth=null
        }
    }
})
export const { saveUserAuth,logout}=AuthSlice.actions
export default AuthSlice.reducer