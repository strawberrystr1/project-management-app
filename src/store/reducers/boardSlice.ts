import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IColumnResponse } from '../../interfaces/apiInterfaces';

type BoardState = {
  columns: IColumnResponse[];
};

const initialState: BoardState = { columns: [] };

const boardSlice = createSlice({
  name: 'boardState',
  initialState,
  reducers: {
    setColumns: (state, action: PayloadAction<IColumnResponse[]>) => {
      state.columns = action.payload;
    },
  },
});

export const { setColumns } = boardSlice.actions;

export default boardSlice.reducer;
