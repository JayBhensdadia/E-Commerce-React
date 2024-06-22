import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


export interface Product {
    _id: string,
    name: string,
    description: string,
    price: number,
    image: string;
}

interface ProductsState {
    value: Product[];
    totalPages: Number;
    selectedProduct: Product | null | undefined;
}


const initialState: ProductsState = {
    value: [],
    totalPages: 0,
    selectedProduct: null
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

        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            state.selectedProduct = action.payload;
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


export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id: string) => {
        const response = await axios({
            method: 'get',
            url: `http://localhost:8080/api/product/${id}`,
            withCredentials: true
        });

        return response.data['product'];
    }
);

export default productSlice.reducer;
