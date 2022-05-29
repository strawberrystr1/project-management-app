import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { openErrorSnack } from './reducers/snackSlice';
import { logOut } from './reducers/userSlice';

const authChecker: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const status = action.payload.status;
    let message = '';

    if (status === 403) {
      api.dispatch(logOut);
      window.history.pushState({}, '', '/home');
      message = action.payload.data.message;
    } else if (
      status === 400 ||
      status === 401 ||
      status === 402 ||
      status === 404 ||
      status === 409
    ) {
      message = action.payload.data.message;
    } else {
      if ('error' in action.payload) {
        message = action.payload.error;
      } else if ('message' in action.payload) {
        message = action.payload.message ? action.payload.message : '';
      }
    }
    api.dispatch(openErrorSnack(message));
  }
  return next(action);
};

export default authChecker;
