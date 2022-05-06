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
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import styles from './style.module.scss';
import React, { useState } from 'react';

// const titleLogo = 'PROJECTS';

const userSettings = [
  {
    text: 'edit profile',
    logo: <EditIcon fontSize="small" />,
    handleClick: () => console.log('edit'),
  },
  {
    text: 'Logout',
    logo: <LogoutIcon fontSize="small" />,
    handleClick: () => console.log('logOut'),
  },
];

const Header = () => {
  const isLogged = true; // replace this for state variable

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const stringAvatar = (name: string) => {
    let nameText;
    if (name.split(' ').length > 1) {
      nameText = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;
    } else {
      nameText = name[0];
    }
    return {
      sx: {
        bgcolor: 'white',
      },
      children: `${nameText}`,
    };
  };

  return (
    <>
      {/* <Container maxWidth={false} component="header" className={styles.headerWrapper}> */}
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {isLogged && (
              <Box sx={{ flexGrow: 1, display: 'flex' }}>
                <Button
                  onClick={() => console.log('creating new desk')}
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                    '&:hover': { color: '#c2c2c2' },
                  }}
                >
                  Create new board
                </Button>
              </Box>
            )}
            {isLogged ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="User settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar {...stringAvatar('Kent Dodos')} />
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
                <Button
                  onClick={() => console.log('creating new desk')}
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                    '&:hover': { color: '#c2c2c2' },
                  }}
                >
                  Create desk
                </Button>
                <div>Sign in</div>
                <div>/</div>
                <div>Sign up</div>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
      {/* </Container> */}
    </>
  );
};

export default Header;
