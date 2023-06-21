import { combineReducers, configureStore } from "@reduxjs/toolkit";
import jokeReducer from "../Slices/jokeslice";
import FactReducer from "../Slices/factslice";
import animeListReducer from "../Slices/animelistslice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import thunk from "redux-thunk";
const persistconfig = {
    key: "root",
    version: 1,
    storage,
    blacklist: ["Fact"],
};
const reducers = combineReducers({
    joke: jokeReducer,
    animeList: animeListReducer,
    Fact: FactReducer,
});
const persist = persistReducer(persistconfig, reducers);
const store = configureStore({
    reducer: persist,
    middleware: [thunk],
});
export default store;
