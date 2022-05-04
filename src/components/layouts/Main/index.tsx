import { Container } from '@mui/material';
import React from 'react';
import MainStyled from './MainStyled';

export const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <MainStyled maxWidth={false}>
      <Container maxWidth="xl">{children}</Container>
    </MainStyled>
  );
};
