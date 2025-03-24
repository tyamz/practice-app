import { configureStore } from '@reduxjs/toolkit';
import { postsApi } from './services/posts';
import userReducer from '../features/users/userSlice';
import { usersApi } from './services/users';

export const store = configureStore({
    reducer: {
        // posts: postsReducer,
        user: userReducer,
        [postsApi.reducerPath]: postsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(postsApi.middleware, usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
