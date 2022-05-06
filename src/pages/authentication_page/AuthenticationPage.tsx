import { Container } from '@mui/material';
import AuthenticationForm from '../../components/AuthenticationForm';
import styles from './style.module.scss';

const AuthenticationPage = () => {
  return (
    <Container maxWidth="sm" className={styles.authContainer}>
      <AuthenticationForm />
    </Container>
  );
};

export default AuthenticationPage;
