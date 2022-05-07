import { Container } from '@mui/material';
import AuthenticationForm from '../../components/AuthenticationForm';
import { signupFields } from '../../utils/constants/formFields';
import styles from './style.module.scss';

const SignUpPage = () => {
  return (
    <Container maxWidth="sm" className={styles.authContainer}>
      <AuthenticationForm fields={signupFields} />
    </Container>
  );
};

export default SignUpPage;
