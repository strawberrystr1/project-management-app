import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  useScrollTrigger,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LanguageSwitch from './components/LanguageSwitch';
import styles from './style.module.scss';
import AuthLogo from './components/AuthLogo';
import CreateBoardForm from '../../CreateBoardForm';
import DialogButton from '../DialogButton';
import { useNavigate } from 'react-router-dom';
import ThemeSwitcher from './components/ThemeSwitcher';
import Burger from './components/Burger';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import { useTypedSelector } from '../../../hooks/redux';

const Header = () => {
  const { isLogged } = useTypedSelector((state) => state.user);
  const { t } = useTranslation();
  const trigger = useScrollTrigger({ disableHysteresis: true });
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="fixed" className={trigger ? styles.color : ''}>
        <Container maxWidth="xl">
          <Toolbar disableGutters className={trigger ? styles.small : ''}>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, columnGap: '10px' }}>
              <Burger />

              <IconButton className={styles.btnStyle} onClick={() => navigate('/home')}>
                <HomeIcon />
              </IconButton>

              {isLogged && (
                <DialogButton
                  type="new_board"
                  btn={(handleOpen) => (
                    <IconButton onClick={handleOpen} className={styles.btnStyle}>
                      <AddIcon />
                    </IconButton>
                  )}
                  form={(handleClose) => <CreateBoardForm handleClose={handleClose} />}
                />
              )}
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, columnGap: '10px' }}>
              <Button
                className={styles.btnStyle}
                onClick={() => navigate('/home')}
                startIcon={<HomeIcon />}
              >
                {t(`buttons.home`)}
              </Button>
              {isLogged && (
                <DialogButton
                  type="new_board"
                  btn={(handleOpen, type) => (
                    <Button onClick={handleOpen} className={styles.btnStyle}>
                      {t(`buttons.${type}`)}
                    </Button>
                  )}
                  form={(handleClose) => <CreateBoardForm handleClose={handleClose} />}
                />
              )}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '20px', ml: 'auto' }}>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, columnGap: '20px' }}>
                <ThemeSwitcher />
                <LanguageSwitch />
              </Box>
              {isLogged && <AuthLogo />}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Header;
