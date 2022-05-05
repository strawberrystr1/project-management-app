import { Container } from '@mui/material';
import styles from './style.module.scss';

export const Footer = () => {
  return (
    <Container maxWidth={false} component="footer" className={styles.FooterWrapper}>
      <Container maxWidth="xl">footer</Container>
    </Container>
  );
};
