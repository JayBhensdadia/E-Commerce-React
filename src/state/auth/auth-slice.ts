import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
    isOpen: boolean,
    content: 'signin' | 'signup';
}


const initialState: AuthState = {
    isOpen: false,
    content: 'signin'
};


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        toggleAuth: (state) => {
            state.isOpen = !state.isOpen;
        },
        changeAuthContent: (state, action: PayloadAction<'signin' | 'signup'>) => {
            state.content = action.payload;
        }
    }
});


export default authSlice.reducer;
export const { toggleAuth, changeAuthContent } = authSlice.actions;