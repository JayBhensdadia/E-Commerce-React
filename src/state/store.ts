import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './product/product-slice';
import sidebarReducer from './sidebar/sidebar-slice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        sidebar: sidebarReducer
    }
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;