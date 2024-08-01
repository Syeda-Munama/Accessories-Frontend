import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../Api/api"

const initialState = {
    allProduct: [],
    isLoading: false,
    error: false
}

export const fetchProduct = createAsyncThunk("products/fetch", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL}/getProduct`)
        return response.data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.message);
    }
})

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.pending, (state) => {
            state.isLoading = true
            console.log("pending");
        })
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.isLoading = false
            state.allProduct = action.payload
            console.log("fulfilled");
        })
        builder.addCase(fetchProduct.rejected, (state) => {
            state.isLoading = false
            state.allProduct = []
            state.error = true
            console.log("rejected");
        })
    }
})

const { actions, reducer } = productSlice;
export default reducer;