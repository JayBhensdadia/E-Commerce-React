import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface CartItem {
    userId: string;
    productId: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: []
};



export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {


            // loadCart();

            const cart = localStorage.getItem('jb-cart');
            if (!cart) {
                state.items.push(action.payload);
                localStorage.setItem('jb-cart', JSON.stringify(state.items));

            } else {

                // const oldItems: CartItem[] = JSON.parse(cart);
                const prevItem = state.items.find((item) => item.productId === action.payload.productId);

                if (prevItem) {
                    prevItem.quantity += action.payload.quantity;
                } else {
                    state.items.push(action.payload);
                }


                localStorage.setItem('jb-cart', JSON.stringify(state.items));

            }


        },
        loadCart: (state) => {
            const cart = localStorage.getItem('jb-cart');
            if (cart) {
                state.items = JSON.parse(cart);
            }
        },
        deleteProductFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.productId !== action.payload);
            localStorage.setItem("jb-cart", JSON.stringify(state.items));
        },

        reduceQuantity: (state, action: PayloadAction<string>) => {
            const reducingItem = state.items.find((item) => item.productId === action.payload);
            if (reducingItem) {
                if (reducingItem.quantity === 1) {
                    state.items = state.items.filter((item) => item.productId !== action.payload);
                    return;
                }
                reducingItem.quantity -= 1;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(syncCart.fulfilled, (state, action) => {
            // state.items = action.payload;
            console.log('car synced!!');

        }).addCase(fetchCartItems.fulfilled, (state, action) => {
            console.log('database cart data loaded!');

            state.items = action.payload;
        }).addCase(addToCartAsync.fulfilled, (state, action) => {
            console.log('success : asyc add to cart');

        }).addCase(deleteCartItemAsync.fulfilled, (state, action) => {
            console.log('success: async delete to cart');

        }).addCase(reduceCartItemQuantityAsync.fulfilled, (state, action) => {
            console.log('success: asycn reduce quantity');

        });
    }
});


export const syncCart = createAsyncThunk(
    'cart/syncCart',
    async () => {
        try {


            const cart = localStorage.getItem('jb-cart');
            if (cart) {
                const response = await axios({
                    method: 'post',
                    withCredentials: true,
                    url: "http://localhost:8080/api/cart/sync",
                    data: {
                        localItems: JSON.parse(cart)
                    }
                });


                localStorage.removeItem('jb-cart');
            }







        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);


export const fetchCartItems = createAsyncThunk(
    'cart/fetchCartItems',
    async () => {
        try {

            const response = await axios({
                method: 'get',
                url: "http://localhost:8080/api/cart",
                withCredentials: true
            });

            return response.data['cartItems'];

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);


export const addToCartAsync = createAsyncThunk(
    'cart/addToCartAsync',
    async ({ userId, productId, quantity }: CartItem) => {
        try {

            const res = await axios({
                method: 'post',
                withCredentials: true,
                url: 'http://localhost:8080/api/cart',
                data: {
                    userId,
                    productId,
                    quantity
                }
            });

        } catch (error) {
            console.log(error);
            throw error;

        }
    }
);

//delete async
export const deleteCartItemAsync = createAsyncThunk(
    'cart/deleteAsync',
    async ({ itemId, userId }: { itemId: string, userId: string; }) => {

        try {

            const res = await axios({
                method: 'delete',
                url: `http://localhost:8080/api/cart`,
                withCredentials: true,
                data: {
                    productId: itemId,
                    userId
                }
            });

        } catch (error) {
            console.log(error);
            throw error;

        }
    }
);



//reduce async
export const reduceCartItemQuantityAsync = createAsyncThunk(
    'cart/reduceAsync',
    async ({ itemId, userId, quantity }: { itemId: string, userId: string, quantity: number; }) => {

        try {

            const res = await axios({
                method: 'put',
                url: `http://localhost:8080/api/cart`,
                withCredentials: true,
                data: {
                    userId,
                    productId: itemId,
                    quantity: quantity - 1
                }
            });

        } catch (error) {
            console.log(error);
            throw error;

        }

    }
);

export default cartSlice.reducer;
export const { addToCart, loadCart, deleteProductFromCart, reduceQuantity } = cartSlice.actions;