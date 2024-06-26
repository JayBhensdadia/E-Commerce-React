import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

export interface CartItem {
    userId: string;
    productId: string;
    quantity: number;
}


//cart state
interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: []
};


//cart slice configurations
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        //how to handle local add to cart
        addToCart: (state, action: PayloadAction<CartItem>) => {

            //get the data from local storage
            const cart = localStorage.getItem('jb-cart');


            //if cart not found
            if (!cart) {

                //then create new one
                state.items.push(action.payload);
                localStorage.setItem('jb-cart', JSON.stringify(state.items));
            } else {

                //if found

                //then check wether the particular item with product id exist or not

                const prevItem = state.items.find((item) => item.productId === action.payload.productId);

                //if yes then update quantity
                if (prevItem) {
                    prevItem.quantity += action.payload.quantity;
                } else {

                    //else create new cart item
                    state.items.push(action.payload);
                }
                localStorage.setItem('jb-cart', JSON.stringify(state.items));
                toast('item added to cart!');
            }
        },


        //load the data from cart
        loadCart: (state) => {
            const cart = localStorage.getItem('jb-cart');
            if (cart) {
                state.items = JSON.parse(cart);
            }
        },

        //delete the product from cart
        deleteProductFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.productId !== action.payload);
            localStorage.setItem("jb-cart", JSON.stringify(state.items));
            toast('item deleted from cart');
        },

        //reduce quantity
        reduceQuantity: (state, action: PayloadAction<string>) => {
            const reducingItem = state.items.find((item) => item.productId === action.payload);
            if (reducingItem) {
                //if quantity is 1 then delete the item
                if (reducingItem.quantity === 1) {
                    state.items = state.items.filter((item) => item.productId !== action.payload);
                    return;
                }
                reducingItem.quantity -= 1;
            }
            localStorage.setItem('jb-cart', JSON.stringify(state.items));
            toast('item quantity reduced from cart');
        }
    },
    extraReducers: (builder) => {
        builder.addCase(syncCart.fulfilled, (state, action) => {
            // Clear local storage after syncing with database
            localStorage.removeItem('jb-cart');
            // toast.success('cart synced with database');


        }).addCase(fetchCartItems.fulfilled, (state, action) => {

            // Ensure to replace local items with the ones fetched from the server
            state.items = action.payload;
            // toast.success('database cart data loaded!');


        }).addCase(addToCartAsync.fulfilled, (state, action) => {

            //on successfull add to cart 
            toast.success('item added to cart');


        }).addCase(deleteCartItemAsync.fulfilled, (state, action) => {

            //on successfull delete 
            toast.success('item deleted from cart');

        }).addCase(reduceCartItemQuantityAsync.fulfilled, (state, action) => {

            //on successfull reduce cart
            toast.success('item quantity reduced from cart');
        });
    }
});


//how to handle sync cart
export const syncCart = createAsyncThunk(
    'cart/syncCart',
    async () => {
        try {
            const cart = localStorage.getItem('jb-cart');
            if (cart) {
                await axios.post(
                    "http://localhost:8080/api/cart/sync",
                    { localItems: JSON.parse(cart) },
                    { withCredentials: true }
                );
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);


//how handle fetch cart items
export const fetchCartItems = createAsyncThunk(
    'cart/fetchCartItems',
    async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/cart", { withCredentials: true });
            return response.data['cartItems'];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);


//how handle add to cart async
export const addToCartAsync = createAsyncThunk(
    'cart/addToCartAsync',
    async ({ userId, productId, quantity }: CartItem) => {
        try {
            await axios.post(
                'http://localhost:8080/api/cart',
                { userId, productId, quantity },
                { withCredentials: true }
            );
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);


//how to handle delete cart item async
export const deleteCartItemAsync = createAsyncThunk(
    'cart/deleteAsync',
    async ({ itemId, userId }: { itemId: string, userId: string; }) => {
        try {
            await axios.delete(
                `http://localhost:8080/api/cart`,
                {
                    withCredentials: true,
                    data: { productId: itemId, userId }
                }
            );
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);


//how to handle reduce cart item quantity async
export const reduceCartItemQuantityAsync = createAsyncThunk(
    'cart/reduceAsync',
    async ({ itemId, userId, quantity }: { itemId: string, userId: string, quantity: number; }) => {
        try {
            await axios.put(
                `http://localhost:8080/api/cart`,
                { userId, productId: itemId, quantity: quantity - 1 },
                { withCredentials: true }
            );
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);

export default cartSlice.reducer;
export const { addToCart, loadCart, deleteProductFromCart, reduceQuantity } = cartSlice.actions;
