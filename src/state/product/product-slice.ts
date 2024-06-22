import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


export interface Product {
    id: string,
    name: string,
    description: string,
    price: number,
    image: string;
}

interface ProductsState {
    value: Product[];
    totalPages: Number;
}


const initialState: ProductsState = {
    value: [],
    totalPages: 0
};


export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.value = action.payload.list;
            state.totalPages = action.payload.totalPages;

        });
    }
});


export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ page, pageSize }: { page: number, pageSize: number; }) => {

        const response = await axios({
            method: 'get',
            url: `http://localhost:8080/api/product?page=${page}&pageSize=${pageSize}`,
            withCredentials: true
        });

        return { list: response.data['products'], totalPages: response.data['totalPages'] };
    }
);

export default productSlice.reducer;
