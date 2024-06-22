import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CartItem {
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
    }
});



export default cartSlice.reducer;
export const { addToCart, loadCart, deleteProductFromCart, reduceQuantity } = cartSlice.actions;