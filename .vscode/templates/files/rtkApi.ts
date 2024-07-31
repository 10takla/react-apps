import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const {fileNameLower}Api = createApi({
    reducerPath: '{fileNameLower}Api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost',
        prepareHeaders: (headers) => {
            return headers;
        },
    }),
    endpoints: (builder) => ({}),
});
