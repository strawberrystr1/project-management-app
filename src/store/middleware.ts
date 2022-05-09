import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { logOut } from './reducers/userSlice';

const authChecker: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action.payload.status === 401) {
      api.dispatch(logOut);
      window.history.pushState({}, '', '/home');
    }
  }
  return next(action);
};

export default authChecker;
