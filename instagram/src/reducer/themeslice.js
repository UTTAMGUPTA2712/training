import { createSlice } from "@reduxjs/toolkit"
import blacklogo from "../assets/images/logoblack.png"
const whiteTheme={
    logo:blacklogo,
    color:"#737373",
    headcolor:"#262626",
    inputcolor:"#CCD0D5",
    backgroundColor:"#FAFAFA",
}
const blackTheme={
    logo:"",
    color:"",
    headcolor:"",
    inputcolor:"",
    backgroundColor:"",
}
const initialTheme={
    theme:whiteTheme
}
export const themeSlice=createSlice({
    name:"theme",
    initialState:initialTheme,
    reducers:{
        changeTheme:(state,action)=>{
            if(action.payload==="whiteTheme"){
                state.theme=whiteTheme
            }else{
                state.theme=blackTheme
            }
        }
    }
})
export const {changeTheme}=themeSlice.actions
export default themeSlice.reducer