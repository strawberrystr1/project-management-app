import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseUrl = 'https://project-manager-by-troitskiy.herokuapp.com/';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['boards', 'Columns', 'Tasks', 'Files'],
  endpoints: () => ({}),
});
