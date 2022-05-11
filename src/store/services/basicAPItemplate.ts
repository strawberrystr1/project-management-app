import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://project-manager-rss.herokuapp.com/' }),
  tagTypes: ['boards'],
  endpoints: (build) => ({}),
});
