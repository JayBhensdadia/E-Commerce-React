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

//user state definition
interface UserState {
    data: User | null | undefined,
}

const initialState: UserState = {
    data: null
};


//user slice configurations
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserDetails.fulfilled, (state, action) => {

            //if successfully fetched user details => update the user state
            //with new fetched value 
            state.data = action.payload;


        }).addCase(loginUser.fulfilled, (state) => {


            //on successfull login show toast
            toast.success('login successfull');

        }).addCase(loginUser.rejected, (state) => {


            //on failed login show toast
            toast.error('login failed!');

        }).addCase(clearMyCartAsyc.fulfilled, (state) => {


            // on successfull clearing of cart show toast
            toast('cart cleard!');


        }).addCase(signupUser.fulfilled, (state, action) => {

            //on successfull signup
            toast.success('account created! now you can login!');



        }).addCase(signupUser.rejected, (state, action) => {

            // on fialed signup
            toast.error('failed to create account! try again!');


        }).addCase(logoutUser.fulfilled, (state, action) => {

            //on successfull logout
            state.data = null;
            toast.success('logged out!');


        }).addCase(logoutUser.rejected, (state, action) => {

            //on failed logout attempt
            toast.error('failed to logout');


        });
    }
});


//how to handle user logout
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


//how to handle user signup
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

//how to handle user login
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


//how to fetch user details
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


//how to handle clear cart from database
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