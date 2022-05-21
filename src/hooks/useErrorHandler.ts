import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { openErrorSnack } from '../store/reducers/snackSlice';
import { useTypedDispatch } from './redux';

export const useErrorHandler = (
  isError: boolean,
  err: FetchBaseQueryError | SerializedError | undefined
) => {
  const dispatch = useTypedDispatch();
  if (!isError || !err) return;

  let message = '';
  if ('error' in err) {
    message = err.error;
  } else if ('message' in err) {
    message = err.message ? err.message : '';
  }
  dispatch(openErrorSnack(message));
};
