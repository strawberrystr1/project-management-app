import { Divider, Drawer, IconButton, List, ListItem, Stack, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Box } from '@mui/system';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitch from './LanguageSwitch';
import { useTranslation } from 'react-i18next';
import FilterBar from '../../../BoardFilterBar/FilterBar';
import { useMatch } from 'react-router-dom';

const Burger = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const { t } = useTranslation();
  const routeMatch = useMatch('/boards/:boardId');

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
    <Box>
      <Typography sx={{ textAlign: 'center', mt: '20px' }}>{t(`header.burgerMenu`)}</Typography>
      <List>
        {routeMatch && (
          <ListItem>
            <Stack
              sx={{ display: { xs: 'flex', md: 'none' } }}
              minHeight={95}
              direction="column"
              justifyContent="flex-start"
            >
              <FilterBar />
            </Stack>
          </ListItem>
        )}
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
