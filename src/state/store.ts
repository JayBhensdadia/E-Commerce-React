import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './product/product-slice';
import sidebarReducer from './sidebar/sidebar-slice';
import cartReducer from './cart/cart-slice';
import userReducer from './user/user-slice';
import authReducer from './auth/auth-slice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        sidebar: sidebarReducer,
        cart: cartReducer,
        user: userReducer,
        auth: authReducer
    }
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;