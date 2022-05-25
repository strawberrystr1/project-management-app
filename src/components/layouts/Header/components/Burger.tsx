import { Divider, Drawer, IconButton, List, ListItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';
import { Box } from '@mui/system';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitch from './LanguageSwitch';
import { useTranslation } from 'react-i18next';

const Burger = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const { t } = useTranslation();

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
      <Typography sx={{ textAlign: 'center', mt: '20px' }}>{t(`header.burgerMenu`)}</Typography>
      <List>
        <ListItem>
          <LanguageSwitch />
        </ListItem>
        <ListItem>
          <ThemeSwitcher />
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      <IconButton size="large" onClick={toggleDrawer(true)} color="inherit" className="header-btn">
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isOpenDrawer} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  );
};

export default Burger;
