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
            toast('login successfull');

        }).addCase(loginUser.rejected, (state) => {
            console.log('login failed...');
            toast('login failed');
        }).addCase(clearMyCartAsyc.fulfilled, (state) => {
            console.log('cart cleard');
            toast('cart cleard!');
        });
    }
});


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