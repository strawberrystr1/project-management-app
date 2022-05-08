import {
  combineReducers,
  configureStore,
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from '@reduxjs/toolkit';
import { api } from './services/basicAPItemplate';
import userReducer from './reducers/userSlice';

const rootReducer = combineReducers({
  user: userReducer,
  [api.reducerPath]: api.reducer,
});

export const authChecker: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action.payload.data.message === 'Unauthorized') {
      localStorage.removeItem('token-rss');
      window.history.pushState({}, '', '/home');
    }
  }
  return next(action);
};

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
