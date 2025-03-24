import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
    reducerPath: 'users',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://dummyjson.com',
    }),
    endpoints: (build) => ({
        getUser: build.query({
            query: (id: string) => `/users/${id}`,
        }),
    }),
});

export const { useGetUserQuery } = usersApi;