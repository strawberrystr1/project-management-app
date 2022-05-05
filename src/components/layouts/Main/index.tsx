import { Container } from '@mui/material';
import React from 'react';
import styles from './style.module.scss';

export const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Container maxWidth={false} component="main" className={styles.MainWrapper}>
      <Container maxWidth="xl">{children}</Container>
    </Container>
  );
};
