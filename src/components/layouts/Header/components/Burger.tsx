import {
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Box } from '@mui/system';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitch from './LanguageSwitch';
import { useTranslation } from 'react-i18next';
import FilterBar from '../../../BoardFilterBar/FilterBar';
import { useMatch } from 'react-router-dom';
import { useTypedSelector } from '../../../../hooks/redux';

const Burger = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const { t } = useTranslation();
  const routeMatch = useMatch('/boards/:boardId');
  const { theme } = useTypedSelector((state) => state.settings);

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
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography sx={{ ml: '10px' }}>{t(`header.burgerMenu`)}</Typography>
        <Button onClick={() => setIsOpenDrawer(false)}>
          <CloseIcon sx={{ color: theme === 'dark' ? 'white' : 'black' }} />
        </Button>
      </Stack>
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
