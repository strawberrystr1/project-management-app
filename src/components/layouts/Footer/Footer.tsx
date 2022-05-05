import { Container } from '@mui/material';
import styles from './style.module.scss';

const Footer = () => {
  return (
    <Container maxWidth={false} component="footer" className={styles.footerWrapper}>
      <Container maxWidth="xl">footer</Container>
    </Container>
  );
};

export default Footer;
