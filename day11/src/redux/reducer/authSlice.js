import { createSlice } from "@reduxjs/toolkit"

const initialValue={
    userAuth:null,
    chatroomid:null,
}
export const AuthSlice=createSlice({
    name:"auth",
    initialState:initialValue,
    reducers:{
        saveUserAuth:(state,action)=>{
            state.userAuth=action.payload
            state.chatroomid=null
        },
        logout:(state)=>{
            state.userAuth=null
        },
        setchatroomid:(state,action)=>{
            state.chatroomid=action.payload
        }
    }
})
export const { saveUserAuth,logout,setchatroomid}=AuthSlice.actions
export default AuthSlice.reducer