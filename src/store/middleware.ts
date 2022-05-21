import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { openErrorSnack } from './reducers/snackSlice';
import { logOut } from './reducers/userSlice';

const authChecker: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    // todo
    console.log('action', action);
    if (action.payload.status === 401) {
      api.dispatch(logOut);
      window.history.pushState({}, '', '/home');
      api.dispatch(openErrorSnack(action.payload.data.message));
    }

    let message = '';
    if ('error' in action.payload) {
      message = action.payload.error;
    } else if ('message' in action.payload) {
      message = action.payload.message ? action.payload.message : '';
    }
    api.dispatch(openErrorSnack(message));
  }
  return next(action);
};

export default authChecker;
