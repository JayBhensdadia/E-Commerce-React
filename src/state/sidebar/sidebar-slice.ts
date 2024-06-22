import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface SidebarState {
    isOpen: boolean,
    content: 'cart' | 'user' | 'checkout';
}

const initialState: SidebarState = {
    isOpen: false,
    content: 'cart'
};


export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggle: (state) => {
            state.isOpen = !state.isOpen;
        },
        changeContent: (state, action: PayloadAction<'cart' | 'user' | 'checkout'>) => {
            state.content = action.payload;
        }
    }
});


export default sidebarSlice.reducer;
export const { toggle, changeContent } = sidebarSlice.actions;