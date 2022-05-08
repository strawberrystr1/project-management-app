import { useEffect } from 'react';
import { useGetUserMutation } from '../store/services/userService';

const useAuthCheck = () => {
  const token = localStorage.getItem('token-rss');

  const [getUser] = useGetUserMutation();

  useEffect(() => {
    if (token) {
      getUser(token);
    }
  }, []);
};

export default useAuthCheck;
