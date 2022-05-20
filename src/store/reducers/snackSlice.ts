import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISnack {
  message: string;
  isSnackBarOpen: boolean;
  severity: 'error' | 'success';
}

const initialState: ISnack = {
  message: '',
  isSnackBarOpen: false,
  severity: 'success',
};

const snackSlice = createSlice({
  name: 'snack',
  initialState,
  reducers: {
    openSuccessSnack(state, action: PayloadAction<string>) {
      state.message = action.payload;
      state.severity = 'success';
      state.isSnackBarOpen = true;
    },
    openErrorSnack(state, action: PayloadAction<string>) {
      state.message = action.payload;
      state.severity = 'error';
      state.isSnackBarOpen = true;
    },
    closeSnack(state) {
      state.message = '';
      state.isSnackBarOpen = false;
    },
  },
});

export const { openSuccessSnack, openErrorSnack, closeSnack } = snackSlice.actions;

export default snackSlice.reducer;
