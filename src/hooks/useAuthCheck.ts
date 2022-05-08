import { useEffect } from 'react';
import { useGetUserMutation } from '../store/services/userService';
import { useTypedSelector } from './redux';

const useAuthCheck = () => {
  const { token } = useTypedSelector((state) => state.user);

  const [getUser] = useGetUserMutation();

  useEffect(() => {
    getUser(token);
  }, []);
};

export default useAuthCheck;
