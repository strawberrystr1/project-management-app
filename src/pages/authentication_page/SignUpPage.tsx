import { Container } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AuthenticationForm from '../../components/AuthenticationForm';
import ErrorBoundary from '../../components/ErrorBoundary';
import { useTypedSelector } from '../../hooks/redux';
import { signupFields } from '../../utils/constants/formFields';
import styles from './style.module.scss';

const SignUpPage = () => {
  const { isLogged } = useTypedSelector((state) => state.user);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (isLogged) {
      navigate('/boards');
    }
  }, []);

  return (
    <ErrorBoundary text={t('errors.default')}>
      <Container maxWidth="sm" className={styles.authContainer}>
        <AuthenticationForm fields={signupFields} />
      </Container>
    </ErrorBoundary>
  );
};

export default SignUpPage;
