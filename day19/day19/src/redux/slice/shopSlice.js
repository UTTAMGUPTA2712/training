import { createSlice } from "@reduxjs/toolkit"

const initalValue = {
    currentUser: null,
    itemList: [],
    title: null,
    userdata: [],
}
export const shopSlice = createSlice({
    name: "shop",
    initialState: initalValue,
    reducers: {
        logUser: (state, action) => {
            state.currentUser = action.payload;
        },
        logout: (state) => {
            state.currentUser = null;
            // state.title = null;
        },
        setItemList: (state, action) => {
            state.itemList = action.payload;
        },
        addItem: (state, action) => {
            state.itemList.push(action.payload);
        },
        setUserData: (state, action) => {
            state.userdata = action.payload;
        },
        setTitle: (state, action) => {
            state.titlevalue = action.payload;
        },
        addUser: (state, action) => {
            state.userdata.push(action.payload);
        },
        clearCart: (state) => {
            state.currentUser.cart = {}
        },
        deleteItem: (state, action) => {
            for(let item of state.itemList) {
                if(item.id===action.payload) {
                    item.user=null
                }
            }
        },
        publishItem: (state, action) => {
            for (let item of state.itemList) {
                if (item.id === action.payload) {
                    item.published = true;
                }
            }
        },
        setItem: (state, action) => {
            const data=state.currentUser.cart;
            state.currentUser.cart={...data,[action.payload.id]:action.payload.count};
            // let flag = true;
            // if (state.currentUser.cart?.length > 0) {
            //     for (let item of state.currentUser.cart) {
            //         if (item.id === action.payload.id) {
            //             flag = false;
            //             item.count = action.payload.count;
            //         }
            //     }
            // }
            // if (flag) {
            //     let neededItem
            //     for (let item of state.itemList) {
            //         if (item.id === action.payload.id) {
            //             neededItem = item;
            //         }
            //     }
            //     neededItem.count = action.payload.count;
            //     if (state.currentUser.cart) {
            //         state.currentUser.cart.push(neededItem);
            //     } else {
            //         state.currentUser.cart = [neededItem];
            //     }
            // }
        },
    }
})
export const { logUser, logout, setItemList, addItem, setUserData, setTitle, addUser, clearCart, deleteItem, publishItem, setItem } = shopSlice.actions
export default shopSlice.reducer