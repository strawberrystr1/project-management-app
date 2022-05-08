import { AppBar, Box, Button, Container, Toolbar, useScrollTrigger } from '@mui/material';
import LanguageSwitch from './components/LanguageSwitch';
import styles from './style.module.scss';
import AuthLogo from './components/AuthLogo';
import UnAuthLogo from './components/UnAuthLogo';
import CreateBoardForm from '../../CreateBoardForm';
import DialogButton from '../DialogButton';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const isLogged = true; // replace this for state variable
  const trigger = useScrollTrigger({ disableHysteresis: true });
  const { t } = useTranslation();

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters className={trigger ? styles.small : ''}>
            {isLogged && (
              <DialogButton
                type="new_board"
                btn={(h, type) => (
                  <Button onClick={h} className={styles.btnStyle}>
                    {t(`buttons.${type}`)}
                  </Button>
                )}
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
