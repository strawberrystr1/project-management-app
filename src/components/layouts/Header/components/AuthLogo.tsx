import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { stringAvatar } from '../../../../utils/functions';
import { useTypedDispatch } from '../../../../hooks/redux';
import { logOut } from '../../../../store/reducers/userSlice';
import { useNavigate } from 'react-router-dom';

const AuthLogo = () => {
  const { t } = useTranslation();
  const trigger = useScrollTrigger({ disableHysteresis: true });
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const userSettings = [
    {
      text: t('header.editProfile'),
      logo: <EditIcon fontSize="small" />,
      handleClick: () => console.log('edit'), //todo
    },
    {
      text: t('header.logOutProfile'),
      logo: <LogoutIcon fontSize="small" />,
      handleClick: () => {
        dispatch(logOut());
        localStorage.removeItem('token-rss');
        navigate('/home');
      },
    },
  ];

  return (
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
  );
};

export default AuthLogo;
