import { combineReducers, configureStore } from '@reduxjs/toolkit';
import testSlice from './reducers/testSlice';

const rootReducer = combineReducers({
  /* for test only */
  test: testSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
