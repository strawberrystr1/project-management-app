import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isLogged: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload;
    },
    logOut: (state) => {
      state.isLogged = false;
      localStorage.removeItem('token-rss');
    },
  },
});

export const { setToken, logOut } = userSlice.actions;

export default userSlice.reducer;
