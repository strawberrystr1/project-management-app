import { Box } from '@mui/system';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTypedDispatch, useTypedSelector } from '../../../../hooks/redux';
import { Switch } from '@mui/material';
import { settingsToggleTheme } from '../../../../store/reducers/settingsSlice';
import styles from '../style.module.scss';

const ThemeSwitcher = () => {
  const { isDarkTheme } = useTypedSelector((state) => state.settings);
  const dispatch = useTypedDispatch();

  return (
    <Box className={styles.theme}>
      <LightModeIcon fontSize="small" />
      <Switch color="info" checked={isDarkTheme} onChange={() => dispatch(settingsToggleTheme())} />
      <DarkModeIcon fontSize="small" />
    </Box>
  );
};

export default ThemeSwitcher;
