import { ThemeOptions, createTheme } from '@mui/material';

const primaryDarkColor = '#689f38';
const primaryLightColor = '#689f38';

export const themeOptionsDark: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: primaryDarkColor,
    },
    secondary: {
      main: '#868d92',
    },
    background: {
      // was
      // default: '#272b30',
      // paper: '#020202',
      // maybe better?
      // paper: '#272b30',
      // default: '#020202',
      // maybe the best to set default?
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
          backgroundColor: primaryDarkColor,
        },
      },
    },
  },
};

export const themeOptionsLight: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: primaryLightColor,
    },
    secondary: {
      main: '#e0dada',
    },
    background: {
      paper: '#e0dada',
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
          backgroundColor: primaryLightColor,
        },
      },
    },
  },
};

export const lightTheme = createTheme(themeOptionsLight);
export const darkTheme = createTheme(themeOptionsDark);
