
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
// import thunk from "redux-thunk";
import authReducer from "../slice/authSlice";
import resumeReducer from "../slice/resumeSlice";



const persistconfig = {
    key: "root",
    version: 1,
    storage,
//     blacklist: ["Fact"],
};
const reducers = combineReducers({
    auth: authReducer,
    resume: resumeReducer,
});
const persist = persistReducer(persistconfig, reducers);
const store = configureStore({
    reducer: persist,
    // middleware: [thunk],
});
// export default store;


// const rootreducers = combineReducers({
//     auth: authReducer,
//     resume: resumeReducer,
// });
// const persistsasa = persistReducer(persistconfig, rootreducers);
// const store = configureStore({
//     reducer:persistsasa,
// });
export default store;

// const persistconfig = {
//     key: "root",
//     version: 1,
//     storage,
//     blacklist: ["Fact"],
// };
// const reducers = combineReducers({
//     joke: jokeReducer,
//     animeList: animeListReducer,
//     Fact: FactReducer,
// });
// const persist = persistReducer(persistconfig, reducers);
// const store = configureStore({
//     reducer: persist,
//     middleware: [thunk],
// });
// export default store;
