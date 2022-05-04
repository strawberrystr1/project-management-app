import { Container, ContainerProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const FooterStyled = styled((props: ContainerProps) => <Container component="footer" {...props} />)`
  height: 60px;
  background-color: red;
`;

export default FooterStyled;
