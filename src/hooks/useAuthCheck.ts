import { useEffect } from 'react';
import jwt from 'jwt-decode';
import { useGetUserMutation } from '../store/services/userService';
import { useTypedSelector } from './redux';

const useAuthCheck = () => {
  const { token } = useTypedSelector((state) => state.user);
  let id = '';
  if (token) {
    const data: { userId: string } = jwt(token);
    id = data.userId;
  }
  const [getUser] = useGetUserMutation();

  useEffect(() => {
    getUser(token);
  }, []);
};

export default useAuthCheck;
