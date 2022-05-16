import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IBoard } from '../../interfaces/apiInterfaces';

export const getBoardById = createAsyncThunk('boardId/get', async (query: string, thunkAPI) => {
  try {
    const { data } = await axios.get<IBoard>(query);
    return data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return thunkAPI.rejectWithValue(e.response);
    }
    return thunkAPI.rejectWithValue('Unexpected error from server. Try later, please.');
  }
});
