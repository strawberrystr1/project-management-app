import { Divider, Drawer, IconButton, List, ListItem, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import React, { useState } from 'react';
import { Box } from '@mui/system';
import DialogButton from '../../DialogButton';
import CreateBoardForm from '../../../CreateBoardForm';
import { useTypedSelector } from '../../../../hooks/redux';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitch from './LanguageSwitch';
import styles from '../style.module.scss';

const Burger = () => {
  const isLogged = true; // replace this for state variable
  const { isDarkTheme } = useTypedSelector((state) => state.settings);
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
        <ListItem>
          <LanguageSwitch />
        </ListItem>
        <ListItem>
          <ThemeSwitcher />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          {isLogged && (
            <MenuItem onClick={toggleDrawer(false)}>
              {/* <DialogButton
                type="new_board"
                className={isDarkTheme ? styles.btnStyle : styles.btnStyleLight}
                form={(h) => <CreateBoardForm handleClose={h} />}
              /> */}
            </MenuItem>
          )}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <IconButton size="large" onClick={toggleDrawer(true)} color="inherit">
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isOpenDrawer} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  );
};

export default Burger;
