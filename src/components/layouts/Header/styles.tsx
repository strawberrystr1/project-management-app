import { Container, ContainerProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeaderStyled = styled((props: ContainerProps) => <Container component="header" {...props} />)(
  () => ({
    height: '80px',
    backgroundColor: 'red',
  })
);

export default HeaderStyled;
