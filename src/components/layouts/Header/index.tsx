import { Container } from '@mui/material';
import styles from './style.module.scss';

export const Header = () => {
  return (
    <Container maxWidth={false} component="header" className={styles.HeaderWrapper}>
      <Container maxWidth="xl">header</Container>
    </Container>
  );
};
