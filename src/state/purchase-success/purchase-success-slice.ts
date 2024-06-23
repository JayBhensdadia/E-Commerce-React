import { createSlice } from "@reduxjs/toolkit";

interface PurchaseSuccessState {
    isDone: boolean;
}

const initialState: PurchaseSuccessState = {
    isDone: false
};


export const purchaseSuccessSlice = createSlice({
    name: 'purchase-success',
    initialState,
    reducers: {
        togglePurchaseSuccess: (state) => {
            state.isDone = !state.isDone;
        }
    }
});


export default purchaseSuccessSlice.reducer;
export const { togglePurchaseSuccess } = purchaseSuccessSlice.actions;