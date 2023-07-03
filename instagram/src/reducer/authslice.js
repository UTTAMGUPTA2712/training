import { createSlice } from "@reduxjs/toolkit"

//initialising the value of all the necessary field in redux
const initialValue = {
    authDetail: null,
    currentChatRoom: null,
    secondUser: null
}
// creating slice
export const authSlice = createSlice({
    name: "auth",
    initialState: initialValue,
    reducers: {
        // saves auth detail 
        saveAuthDetail: (state, action) => {
            state.authDetail = action.payload
        },
        // logs out the user
        logout: (state) => {
            state.authDetail = null
        },
        // sets the current chat room id
        saveCurrentChatRoom: (state, action) => {
            state.currentChatRoom = action.payload
        },
        // saves the user id the current user is talking to in chatroom
        saveSecondUser: (state, action) => {
            state.secondUser = action.payload
        },
        // clean the datat of chat room
        cleanChatRoom: (state) => {
            state.currentChatRoom = null
            state.secondUser = null
        }
    }
})
// exporting the actions
export const { saveAuthDetail, logout, saveCurrentChatRoom, saveSecondUser, cleanChatRoom } = authSlice.actions
// exporting the reducer
export default authSlice.reducer