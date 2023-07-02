import { createSlice } from "@reduxjs/toolkit"

const initialValue={
    authDetail:null,
    currentChatRoom:null,
    secondUser:null
}
export const authSlice=createSlice({
    name:"auth",
    initialState:initialValue,
    reducers:{
        saveAuthDetail:(state,action)=>{
            state.authDetail=action.payload
        },
        logout:(state)=>{
            state.authDetail=null
        },
        saveCurrentChatRoom:(state,action)=>{
            state.currentChatRoom=action.payload
        },
        saveSecondUser:(state,action)=>{
            state.secondUser=action.payload
        }
    }
})
export const {saveAuthDetail,logout,saveCurrentChatRoom,saveSecondUser}=authSlice.actions
export default authSlice.reducer