import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://project-manager-by-troitskiy.herokuapp.com/' }),
  tagTypes: ['boards', 'Columns', 'Tasks'],
  endpoints: () => ({}),
});
