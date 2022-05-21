import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { IAPIError } from '../interfaces/apiInterfaces';
import { openErrorSnack } from '../store/reducers/snackSlice';
import { useTypedDispatch } from './redux';

export const useErrorHandler = (
  isError: boolean,
  error: FetchBaseQueryError | SerializedError | undefined
) => {
  const dispatch = useTypedDispatch();
  if (isError) {
    const { message } = (error as IAPIError).data;
    dispatch(openErrorSnack(message));
  }
};
