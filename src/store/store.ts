import { combineReducers, configureStore } from '@reduxjs/toolkit';
import testSlice from './reducers/testSlice';
import userInfoReducer from './reducers/userInfoSlice';

const rootReducer = combineReducers({
  /* for test only */
  test: testSlice,
  userInfo: userInfoReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
