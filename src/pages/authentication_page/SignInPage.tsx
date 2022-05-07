import { Container } from '@mui/material';
import AuthenticationForm from '../../components/AuthenticationForm';
import { signinFields } from '../../utils/constants/formFields';
import styles from './style.module.scss';

const SignInPage = () => {
  return (
    <Container maxWidth="sm" className={styles.authContainer}>
      <AuthenticationForm fields={signinFields} />
    </Container>
  );
};

export default SignInPage;
