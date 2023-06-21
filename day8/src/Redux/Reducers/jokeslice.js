import { createAsyncThunk } from "@reduxjs/toolkit";
import JokeApi from "../../services/jokeapi";
import { getJoke } from "../action/action";

export const fetchJoke = createAsyncThunk(getJoke, async () => {
    try {
        const response = await JokeApi();
        return response.data;
    } catch (error) {
        console.log(error);
    }
});
