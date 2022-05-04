import { Container, ContainerProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const MainStyled = styled((props: ContainerProps) => <Container component="main" {...props} />)`
  height: calc(100% - 140px);
  background-color: yellow;
`;

export default MainStyled;
