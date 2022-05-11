import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isLogged: false,
  userId: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ isLogged: boolean; id: string }>) => {
      state.isLogged = action.payload.isLogged;
      state.userId = action.payload.id;
    },
    logOut: (state) => {
      console.log('1');
      state.isLogged = false;
      state.userId = '';
      localStorage.removeItem('token-rss');
    },
  },
});

export const { setToken, logOut } = userSlice.actions;

export default userSlice.reducer;
