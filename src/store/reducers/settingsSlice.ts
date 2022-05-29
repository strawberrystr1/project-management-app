import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISettings {
  theme: string;
  language: string;
}

const initialState: ISettings = {
  theme: localStorage.getItem('theme') || 'dark',
  language: localStorage.getItem('i18nextLng') || 'en',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    settingsToggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', state.theme);
    },
    settingsToggleLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
  },
});

export const { settingsToggleTheme, settingsToggleLanguage } = settingsSlice.actions;

export default settingsSlice.reducer;
