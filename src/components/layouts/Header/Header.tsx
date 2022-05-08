import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  MenuItem,
  Toolbar,
  useScrollTrigger,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LanguageSwitch from './components/LanguageSwitch';
import styles from './style.module.scss';
import AuthLogo from './components/AuthLogo';
import CreateBoardForm from '../../CreateBoardForm';
import DialogButton from '../DialogButton';
import { useNavigate } from 'react-router-dom';
import ThemeSwitcher from './components/ThemeSwitcher';
import { useState } from 'react';
import { useTypedSelector } from '../../../hooks/redux';
import Burger from './components/Burger';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';

const Header = () => {
  const isLogged = true; // replace this for state variable
  const { t } = useTranslation();

  const trigger = useScrollTrigger({ disableHysteresis: true });
  const navigate = useNavigate();
  const { isDarkTheme } = useTypedSelector((state) => state.settings);

  const createLanguageSwitcher = () => <LanguageSwitch />;
  const createThemeSwitcher = () => <ThemeSwitcher />;

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setIsOpenDrawer(open);
  };

  const list = () => (
    <Box onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItem>{createLanguageSwitcher()}</ListItem>
        <ListItem>{createThemeSwitcher()}</ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" className={trigger ? styles.color : ''}>
        <Container maxWidth="xl">
          <Toolbar disableGutters className={trigger ? styles.small : ''}>
            {/* drawer */}
            <Drawer anchor="left" open={isOpenDrawer} onClose={toggleDrawer(false)}>
              {list()}
            </Drawer>
            {/* burger menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, columnGap: '10px' }}>
              <IconButton size="large" onClick={toggleDrawer(true)} color="inherit">
                <MenuIcon />
              </IconButton>

              {/* <Burger /> */}
              <IconButton className={styles.btnStyle} onClick={() => navigate('/home')}>
                <HomeIcon />
              </IconButton>
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <DialogButton
                  type="new_board"
                  btn={(h) => (
                    <IconButton onClick={h}>
                      <AddIcon />
                    </IconButton>
                  )}
                  form={(h) => <CreateBoardForm handleClose={h} />}
                />
              </Box>
            </Box>

            <Button
              sx={{ display: { xs: 'none', md: 'flex' } }}
              className={styles.btnStyle}
              onClick={() => navigate('/home')}
              startIcon={<HomeIcon />}
            >
              Home
            </Button>

            {isLogged && (
              <>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  <DialogButton
                    type="new_board"
                    btn={(h, type) => (
                      <Button onClick={h} className={styles.btnStyle}>
                        {t(`buttons.${type}`)}
                      </Button>
                    )}
                    form={(h) => <CreateBoardForm handleClose={h} />}
                  />
                </Box>
              </>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '20px', ml: 'auto' }}>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, columnGap: '20px' }}>
                {createThemeSwitcher()}
                {createLanguageSwitcher()}
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
