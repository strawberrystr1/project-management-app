import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logOut: (state) => {
      state.token = '';
    },
  },
});

export const { setToken, logOut } = userSlice.actions;

export default userSlice.reducer;
