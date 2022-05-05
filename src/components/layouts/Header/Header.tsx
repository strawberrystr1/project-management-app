import { Container } from '@mui/material';
import styles from './style.module.scss';

const Header = () => {
  return (
    <Container maxWidth={false} component="header" className={styles.headerWrapper}>
      <Container maxWidth="xl">header</Container>
    </Container>
  );
};

export default Header;
