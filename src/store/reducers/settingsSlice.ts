import { createSlice } from '@reduxjs/toolkit';

export interface ISettings {
  isDarkTheme: boolean;
}

const initialState: ISettings = {
  isDarkTheme: true,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    settingsToggleTheme(state) {
      state.isDarkTheme = !state.isDarkTheme;
    },
  },
});

export const { settingsToggleTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
