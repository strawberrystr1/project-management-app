import { Container } from '@mui/material';
import FooterStyled from './styles';

export const Footer = () => {
  return (
    <FooterStyled maxWidth={false}>
      <Container maxWidth="xl">footer</Container>
    </FooterStyled>
  );
};
