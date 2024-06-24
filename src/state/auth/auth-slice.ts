import { PayloadAction, createSlice } from "@reduxjs/toolkit";


//auth state
interface AuthState {
    isOpen: boolean,
    content: 'signin' | 'signup';
}


const initialState: AuthState = {
    isOpen: false,
    content: 'signin'
};


//configure auth slice
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        //toggle the state
        toggleAuth: (state) => {
            state.isOpen = !state.isOpen;
        },

        //what to show in auth dialog
        changeAuthContent: (state, action: PayloadAction<'signin' | 'signup'>) => {
            state.content = action.payload;
        }
    }
});


export default authSlice.reducer;
export const { toggleAuth, changeAuthContent } = authSlice.actions;