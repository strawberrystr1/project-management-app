import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISettings {
  isDarkTheme: boolean;
  language: string;
}

const initialState: ISettings = {
  isDarkTheme: true,
  language: localStorage.getItem('i18nextLng') || 'en',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    settingsToggleTheme(state) {
      state.isDarkTheme = !state.isDarkTheme;
    },
    settingsToggleLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
  },
});

export const { settingsToggleTheme, settingsToggleLanguage } = settingsSlice.actions;

export default settingsSlice.reducer;
