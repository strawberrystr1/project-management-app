import { Container } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationForm from '../../components/AuthenticationForm';
import { useTypedSelector } from '../../hooks/redux';
import { signupFields } from '../../utils/constants/formFields';
import styles from './style.module.scss';

const SignUpPage = () => {
  const { isLogged } = useTypedSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate('/boards');
    }
  }, []);

  return (
    <Container maxWidth="sm" className={styles.authContainer}>
      <AuthenticationForm fields={signupFields} />
    </Container>
  );
};

export default SignUpPage;
