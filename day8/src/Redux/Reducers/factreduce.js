import { createAsyncThunk } from "@reduxjs/toolkit";
import FactApi from "../../services/factapi";
import { getFact } from "../action/action";

export const fetchFact = createAsyncThunk(getFact, async () => {
    try {
        const response = await FactApi();
        return response.data;
    } catch (error) {
        console.log("....................", error);
        return error;
    }
});
