import { Container } from '@mui/material';
import React from 'react';
import styles from './style.module.scss';

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Container maxWidth={false} component="main" className={styles.main}>
      <Container maxWidth="xl" className={styles['main-wrapper']}>
        {children}
      </Container>
    </Container>
  );
};

export default Main;
