import { AppBar, Box, Container, Toolbar, useScrollTrigger } from '@mui/material';
import LanguageSwitch from './components/LanguageSwitch';
import styles from './style.module.scss';
import CreateBoardBtn from './components/CreateBoardBtn';
import AuthLogo from './components/AuthLogo';
import UnAuthLogo from './components/UnAuthLogo';

const Header = () => {
  const isLogged = true; // replace this for state variable
  const trigger = useScrollTrigger({ disableHysteresis: true });

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters className={trigger ? styles.small : ''}>
            {isLogged && <CreateBoardBtn />}
            <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '20px', ml: 'auto' }}>
              {!trigger && <LanguageSwitch />}
              {isLogged ? <AuthLogo /> : <UnAuthLogo />}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Header;
