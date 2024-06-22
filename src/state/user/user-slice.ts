import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
        });

        builder.addCase(loginUser.fulfilled, (state) => {
            console.log('loggin in....');

        });
    }
});


export const loginUser = createAsyncThunk(
    'user/login',
    async ({ email, password }: { email: string, password: string; }, { dispatch }) => {
        const response = await axios({
            method: 'post',
            url: "localhost:8080/api/signin",
            data: {
                email,
                password
            },
            withCredentials: true
        });

        dispatch(fetchUserDetails());

    }
);

export const fetchUserDetails = createAsyncThunk(
    'user/fetchUserDetails',
    async () => {
        const response = await axios({
            method: 'get',
            url: 'http://localhost:8080/api/user/me',
            withCredentials: true
        });

        return response.data;
    }
);

export default userSlice.reducer;

export const { } = userSlice.actions;