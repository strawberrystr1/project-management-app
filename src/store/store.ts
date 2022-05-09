import { combineReducers, configureStore } from '@reduxjs/toolkit';
import testSlice from './reducers/testSlice';
import userInfoReducer from './reducers/userInfoSlice';
import boardReducer from './reducers/boardSlice';

const rootReducer = combineReducers({
  /* for test only */
  test: testSlice,
  userInfo: userInfoReducer,
  board: boardReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
