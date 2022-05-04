import { Container } from '@mui/material';
import HeaderStyled from './styles';

export const Header = () => {
  return (
    <HeaderStyled maxWidth={false}>
      <Container maxWidth="xl">header</Container>
    </HeaderStyled>
  );
};
