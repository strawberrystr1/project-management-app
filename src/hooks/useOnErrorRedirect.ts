import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useOnErrorRedirect = (isError: boolean) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate('*');
    }
  }, [isError, navigate]);
};
