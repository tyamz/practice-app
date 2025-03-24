import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../models/Post';
import { RootState } from '../../app/store';

export interface PostsState {
    posts: Post[];
    loading: boolean;
    error?: string;
}

const initialState: PostsState = {
    posts: [],
    loading: false,
};

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPostsAsync.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.loading = false;
            state.error = undefined;
        });
        builder.addCase(getPostsAsync.pending, (state) => {
            state.loading = true;
            state.error = undefined;
        });
        builder.addCase(getPostsAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export const getPostsAsync = createAsyncThunk('posts/getPosts', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return response.json();
});

export default postsSlice.reducer;

export const selectPosts = (state: RootState) => state.posts;