import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface IUserInfoState {
  name: string;
  string: string;
  login: string;
  id: string;
}

const initialState: IUserInfoState = {
  name: '',
  string: '',
  login: '',
  id: '',
};

const signUp = createAsyncThunk('sigUp', async () => {});

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {},
});

export default userInfoSlice.reducer;
