import { AppBar, Box, Container, Toolbar, useScrollTrigger } from '@mui/material';
import LanguageSwitch from './components/LanguageSwitch';
import styles from './style.module.scss';
import AuthLogo from './components/AuthLogo';
import UnAuthLogo from './components/UnAuthLogo';
import CreateBoardForm from '../../CreateBoardForm';
import DialogButton from '../DialogButton';
import { useTypedSelector } from '../../../hooks/redux';

const Header = () => {
  const { isLogged } = useTypedSelector((state) => state.user);
  const trigger = useScrollTrigger({ disableHysteresis: true });

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters className={trigger ? styles.small : ''}>
            {isLogged && (
              <DialogButton
                type="new_board"
                className={styles.btnStyle}
                form={(h) => <CreateBoardForm handleClose={h} />}
              />
            )}
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
