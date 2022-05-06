import { ThemeOptions, createTheme } from '@mui/material';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#226952',
    },
    secondary: {
      main: '#868d92',
    },
    background: {
      default: '#272b30',
      paper: '#3a3f44',
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
    fontFamily: 'Droid Sans',
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
