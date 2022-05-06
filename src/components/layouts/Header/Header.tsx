import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import LanguageSwitch from './components/LanguageSwitch';
import styles from './style.module.scss';
import React, { useState } from 'react';
import { stringAvatar } from '../../../utils/functions';

const Header = () => {
  const isLogged = false; // replace this for state variable

  const { t } = useTranslation();
  const trigger = useScrollTrigger({ disableHysteresis: true });

  const userSettings = [
    {
      text: t('header.editProfile'),
      logo: <EditIcon fontSize="small" />,
      handleClick: () => console.log('edit'), //todo
    },
    {
      text: t('header.logOutProfile'),
      logo: <LogoutIcon fontSize="small" />,
      handleClick: () => console.log('logOut'), //todo
    },
  ];

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const btnStyle = {
    color: 'white',
    '&:hover': { color: '#c2c2c2' },
  };

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters className={trigger ? styles.small : ''}>
            {isLogged && (
              <Box sx={{ flexGrow: 1, display: 'flex' }}>
                <Button onClick={() => console.log('creating new desk')} sx={btnStyle}>
                  {t('header.createBoard')}
                </Button>
              </Box>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '20px', ml: 'auto' }}>
              {!trigger && <LanguageSwitch />}

              {/* className={trigger ? styles.small : styles.large} */}
              {isLogged ? (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title={t('header.userSettings')}>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        sx={
                          trigger
                            ? {
                                bgcolor: 'white',
                                width: 30,
                                height: 30,
                                fontSize: '0.5em',
                              }
                            : {
                                bgcolor: 'white',
                              }
                        }
                      >
                        {stringAvatar('Kent Dodos')}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {userSettings.map((setting) => (
                      <MenuItem
                        key={setting.text}
                        onClick={() => {
                          setting.handleClick();
                          handleCloseUserMenu();
                        }}
                      >
                        {setting.logo}
                        <Typography
                          sx={{
                            marginLeft: 2,
                          }}
                          textAlign="center"
                        >
                          {setting.text}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              ) : (
                <Box sx={{ flexGrow: 1, display: 'flex' }}>
                  <Button onClick={() => console.log('Sign in')} sx={btnStyle}>
                    {t('header.signInProfile')}
                  </Button>
                  <Button onClick={() => console.log('Sign up')} sx={btnStyle}>
                    {t('header.signUpProfile')}
                  </Button>
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Header;
