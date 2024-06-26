import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


//purchase success state
//used to show success pop up on sucessfull placement of order
interface PurchaseSuccessState {
    isDone: boolean;
}

const initialState: PurchaseSuccessState = {
    isDone: false
};

//purchaseSuccessSlice configurateion
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