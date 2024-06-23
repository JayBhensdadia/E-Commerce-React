import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";


interface User {
    _id: string;
    firstName?: string | null;
    lastName?: string | null;
    userName?: string | null;
    email: string;
    password: string;
    profilePicture?: string | null;
    phoneNumber?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}


interface UserState {
    data: User | null | undefined,
}

const initialState: UserState = {
    data: null
};



export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
            state.data = action.payload;
        }).addCase(loginUser.fulfilled, (state) => {
            console.log('loggin in....');
            toast.success('login successfull');

        }).addCase(loginUser.rejected, (state) => {
            console.log('login failed...');
            toast.error('login failed!');
        }).addCase(clearMyCartAsyc.fulfilled, (state) => {
            console.log('cart cleard');
            toast('cart cleard!');
        }).addCase(signupUser.fulfilled, (state, action) => {
            toast.success('account created! now you can login!');
        }).addCase(signupUser.rejected, (state, action) => {
            toast.error('failed to create account! try again!');
        }).addCase(logoutUser.fulfilled, (state, action) => {
            state.data = null;
            toast.success('logged out!');
        }).addCase(logoutUser.rejected, (state, action) => {

            toast.error('failed to logout');
        });
    }
});


export const logoutUser = createAsyncThunk(
    'user/logout',
    async () => {
        try {
            const response = await axios({
                method: 'get',
                url: "http://localhost:8080/api/logout",
                withCredentials: true
            });

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);

export const signupUser = createAsyncThunk(
    'user/signup',
    async ({ email, password }: { email: string, password: string; }, { dispatch }) => {
        try {

            const response = await axios({
                method: 'post',
                url: "http://localhost:8080/api/signup",
                data: {
                    email,
                    password
                },
                withCredentials: true
            });
            // await dispatch(fetchUserDetails());
        } catch (error) {
            console.log(error);
            throw error;
        }


    }

);


export const loginUser = createAsyncThunk(
    'user/login',
    async ({ email, password }: { email: string, password: string; }, { dispatch }) => {
        try {

            const response = await axios({
                method: 'post',
                url: "http://localhost:8080/api/signin",
                data: {
                    email,
                    password
                },
                withCredentials: true
            });
            await dispatch(fetchUserDetails());
        } catch (error) {
            console.log(error);
            throw error;
        }


    }
);

export const fetchUserDetails = createAsyncThunk(
    'user/fetchUserDetails',
    async () => {
        try {

            const response = await axios({
                method: 'get',
                url: 'http://localhost:8080/api/user/me',
                withCredentials: true
            });

            return response.data;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);

export const clearMyCartAsyc = createAsyncThunk(
    'user/clearCartAsync',
    async () => {
        try {


            const res = await axios({
                method: 'get',
                url: "http://localhost:8080/api/cart/clear",
                withCredentials: true
            });



        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);


export default userSlice.reducer;

export const { } = userSlice.actions;