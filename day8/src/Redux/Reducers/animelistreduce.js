import { createAsyncThunk } from "@reduxjs/toolkit";
import AnimeListApi from "../../services/animelistapi";
import { getAnimeList } from "../action/action";
export const fetchAnimeList = createAsyncThunk(getAnimeList, async () => {
    try {
        const response = await AnimeListApi();
        return response.data;
    } catch (error) {
        console.log(error);
    }
});
