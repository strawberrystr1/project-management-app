import { ThemeOptions, createTheme } from '@mui/material';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#689f38',
    },
    secondary: {
      main: '#868d92',
    },
    background: {
      default: '#272b30',
      paper: '#020202',
    },
    error: {
      main: '#ef6a67',
    },
    warning: {
      main: '#f99f1f',
    },
    info: {
      main: '#67c5e0',
    },
    success: {
      main: '#6fc96f',
    },
  },
  typography: {
    fontFamily: 'sans-serif',
  },
  spacing: 7,
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#226952',
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);
