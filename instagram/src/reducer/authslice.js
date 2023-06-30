import { createSlice } from "@reduxjs/toolkit"

const initialValue={
    authDetail:null,

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
    }
})
export const {saveAuthDetail,logout}=authSlice.actions
export default authSlice.reducer