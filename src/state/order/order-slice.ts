import CartItem from "@/components/CartItem";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

export interface Order {
    _id: string,
    userId: string,
    total: number,
    createdAt: string,
    updatedAt: string;
}

export interface OrderItem {
    _id: string,
    orderId: string,
    productId: string,
    quantity: number;
}

interface OrdersState {
    orders: Order[];
    orderItems: OrderItem[];
}


const initialState: OrdersState = {
    orders: [],
    orderItems: []
};


export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {


        builder.addCase(placeOrder.fulfilled, (state, action) => {
            toast.success('order placed');
        })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.orders = action.payload;
                // toast.success('orders fetched');
            }).addCase(fetchOrderItems.fulfilled, (state, action) => {
                state.orderItems = action.payload;
                toast.success('order items fetched');
            });

    }
});


export const placeOrder = createAsyncThunk(
    'orders/place-order',
    async ({ userId, total, orderItems }: { userId: string, total: number, orderItems: CartItem[]; }) => {
        try {

            const response = await axios({
                method: 'post',
                url: 'http://localhost:8080/api/place-order',
                withCredentials: true,
                data: {
                    userId,
                    total,
                    orderItems
                }
            });

        } catch (error) {
            console.log(error);
            throw error;

        }


    }
);


export const fetchOrders = createAsyncThunk(
    'orders/get-my-orders',
    async () => {
        try {

            const response = await axios({
                method: 'get',
                url: "http://localhost:8080/api/order",
                withCredentials: true
            });

            return response.data.orders;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);

export const fetchOrderItems = createAsyncThunk(
    'orders/fetch-order-items',
    async ({ orderId }: { orderId: string; }) => {
        try {

            const response = await axios({
                method: 'get',
                url: `http://localhost:8080/api/order/${orderId}`,
                withCredentials: true
            });

            return response.data.orderItems;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);


export default orderSlice.reducer;