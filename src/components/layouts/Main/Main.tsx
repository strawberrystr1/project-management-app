import { Container } from '@mui/material';
import React from 'react';
import styles from './style.module.scss';

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Container maxWidth={false} component="main" className={styles.mainWrapper}>
      <Container maxWidth="xl">{children}</Container>
    </Container>
  );
};

export default Main;
