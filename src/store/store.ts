import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from './services/basicAPItemplate';
import userReducer from './reducers/userSlice';
import authChecker from './middleware';
import settingsSlice from './reducers/settingsSlice';
import { api2 } from './services/newBE';

const rootReducer = combineReducers({
  user: userReducer,
  [api.reducerPath]: api.reducer,
  [api2.reducerPath]: api2.reducer,
  settings: settingsSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (gDM) => gDM().concat(api.middleware).concat(authChecker),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
