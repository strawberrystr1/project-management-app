import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { api } from './services/basicAPItemplate';
import userReducer from './reducers/userSlice';
import authChecker from './middleware';

const rootReducer = combineReducers({
  user: userReducer,
  [api.reducerPath]: api.reducer,
});

const restoreStore = () => {
  if (localStorage.getItem('token-rss') !== null) {
    return { user: { isLogged: true } };
  }
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (gDM) => gDM().concat(api.middleware).concat(authChecker),
  preloadedState: restoreStore(),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
