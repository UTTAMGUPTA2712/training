import { createSlice } from "@reduxjs/toolkit";
const initialvalue = {
    value: [
        {
            userId: "uttam1234",
            name: "Uttam",
            pic: "https://cdn-icons-png.flaticon.com/128/1999/1999625.png",
            taskCount: 0,
        },
        {
            userId: "yash1234",
            name: "Yash",
            pic: "https://cdn-icons-png.flaticon.com/128/2202/2202112.png",
            taskCount: 0,
        },
        {
            userId: "deepanshu1234",
            name: "Deepanshu",
            pic: "https://cdn-icons-png.flaticon.com/128/219/219970.png",
            taskCount: 0,
        },
        {
            userId: "deepak1234",
            name: "Deepak",
            pic: "https://cdn-icons-png.flaticon.com/128/4139/4139993.png",
            taskCount: 0,
        },
        {
            userId: "chetan1234",
            name: "Chetan",
            pic: "https://cdn-icons-png.flaticon.com/128/4333/4333609.png",
            taskCount: 0,
        },
    ],
    task: [],
};
export const arrSlice = createSlice({
    name: "arr",
    initialState: initialvalue,
    reducers: {
        add: (state, action) => {
            console.log(action.payload);
            for(let tasknow of state.task) {
                const task=JSON.parse(tasknow);
                if(task.user.userId==action.payload[0]&&task.task==action.payload[1]) {
                    return state
                }
            }
            for (let user of state.value) {
                if (user.userId === action.payload[0]) {
                    user.taskCount += 1;

                    state.task.push(JSON.stringify({ user: user, task: action.payload[1], date: action.payload[2] }));
                }
            }
        },
        deleter: (state, action) => {
            // state.value.splice(action.payload, 1)
        },
    },
});
export const { add, deleter } = arrSlice.actions;
export default arrSlice.reducer;
