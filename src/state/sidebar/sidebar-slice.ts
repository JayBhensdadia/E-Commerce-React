import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//sidebar state
interface SidebarState {
    isOpen: boolean,
    content: 'cart' | 'user' | 'checkout';
}

const initialState: SidebarState = {
    isOpen: false,
    content: 'cart'
};

//sidebar slice configurations
export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {

        //toggle the sidebar
        toggle: (state) => {
            state.isOpen = !state.isOpen;
        },

        //what to show in sidebar
        changeContent: (state, action: PayloadAction<'cart' | 'user' | 'checkout'>) => {
            state.content = action.payload;
        }
    }
});


export default sidebarSlice.reducer;
export const { toggle, changeContent } = sidebarSlice.actions;