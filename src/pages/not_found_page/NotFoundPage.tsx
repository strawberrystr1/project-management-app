import { Container } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/home');
    }, 3000);
  }, []);

  return <Container maxWidth="xl">Page not found redirect in 3 seconds</Container>;
};

export default NotFound;