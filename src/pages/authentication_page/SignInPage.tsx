import { Container } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationForm from '../../components/AuthenticationForm';
import { useTypedSelector } from '../../hooks/redux';
import { signinFields } from '../../utils/constants/formFields';
import styles from './style.module.scss';

const SignInPage = () => {
  const { isLogged } = useTypedSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate('/boards');
    }
  }, []);

  return (
    <Container maxWidth="sm" className={styles.authContainer}>
      <AuthenticationForm fields={signinFields} />
    </Container>
  );
};

export default SignInPage;
