import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post } from '../../models/Post';

export const postsApi = createApi({
    reducerPath: 'posts',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://dummyjson.com/posts',
    }),
    endpoints: (build) => ({
        getPosts: build.query({
            query: () => '/',
        }),
        getPostById: build.query<Post, string>({
            query: (id: string) => `/${id}`,
        })
    }),
});

export const { useGetPostsQuery, useGetPostByIdQuery } = postsApi;
