import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ITest {
  count: number;
}

const initialState: ITest = {
  count: 0,
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    testIncreaseBy(state, action: PayloadAction<number>) {
      state.count += action.payload;
    },
    testDecrease(state) {
      state.count -= 1;
    },
    testResetCount(state) {
      state.count = 0;
    },
  },
});

export const { testIncreaseBy, testDecrease, testResetCount } = testSlice.actions;

export default testSlice.reducer;
