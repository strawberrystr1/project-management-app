import { createSlice } from '@reduxjs/toolkit';

type Column = {
  id: string;
  title: string;
  order: number;
};

type BoardState = {
  columns: Column[];
};

const initialState: BoardState = { columns: [] };

const boardSlice = createSlice({
  name: 'boardState',
  initialState,
  reducers: {},
});

export default boardSlice.reducer;
