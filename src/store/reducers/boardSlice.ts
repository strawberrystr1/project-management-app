import { createSlice } from '@reduxjs/toolkit';
import { IColumnResponce } from '../../interfaces/apiInterfaces';

type BoardState = {
  columns: IColumnResponce[];
};

const initialState: BoardState = { columns: [] };

const boardSlice = createSlice({
  name: 'boardState',
  initialState,
  reducers: {},
});

export default boardSlice.reducer;
