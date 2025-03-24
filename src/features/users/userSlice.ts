import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import User from '../../models/User';
import axios, { AxiosError } from 'axios';
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

console.log(token, user);

export interface UserState {
    user?: User;
    token?: string;
    loading: boolean;
    error?: string;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    user: user ? JSON.parse(user) : undefined,
    token: token ?? undefined,
    loading: false,
    isAuthenticated: !!token,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            state.user = undefined;
            state.token = undefined;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (build) => {
        build.addCase(authenticateUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.isAuthenticated = true;
        });
        build.addCase(authenticateUser.pending, (state) => {
            state.error = undefined;
            state.loading = true;
            state.isAuthenticated = false;
        });
        build.addCase(authenticateUser.rejected, (state, action) => {
            console.log(action);
            state.error = typeof action.payload == 'string' ? action.payload : 'Error Occurred';
            state.isAuthenticated = false;
            state.loading = false;
        });
    },
});

export const authenticateUser = createAsyncThunk(
    'user/auth',
    async (credentials: { username: string; password: string }, api) => {
        try {
            const response = await axios.post(
                'https://dummyjson.com/user/login',
                {
                    username: credentials.username,
                    password: credentials.password,
                    expiresInMins: 30, // optional, defaults to 60
                }
            );
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('user', JSON.stringify(response.data));
            return response.data;
        } catch (err) {
            console.error(err);
            if(err instanceof AxiosError) {
                return api.rejectWithValue(
                    err.response?.data?.message ?? 'Login failed'
                );
            }
        }
    }
);

const userReducer = userSlice.reducer;

export const { logout } = userSlice.actions;

export default userReducer;
