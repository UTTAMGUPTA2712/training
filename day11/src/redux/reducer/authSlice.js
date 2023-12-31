import { createSlice } from "@reduxjs/toolkit"

const initialValue={
    userAuth:null,
    chatroomid:null,
    allusers:[],
    curchatroom:null
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
            state.chatroomid=null
            state.curchatroom=null
        },
        setchatroomid:(state,action)=>{
            state.chatroomid=action.payload
        },
        setallusers:(state,action)=>{
            state.allusers=action.payload
        },
        setcurchatuser:(state,action)=>{
            state.curchatroom=action.payload
        }
    }
})
export const { saveUserAuth,logout,setchatroomid,setallusers,setcurchatuser}=AuthSlice.actions
export default AuthSlice.reducer