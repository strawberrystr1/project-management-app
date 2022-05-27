import { ThemeOptions, createTheme } from '@mui/material';

const primaryDarkColor = '#689f38';
const primaryLightColor = '#689f38';

const darkFontColor = '#fefefe';
const lightFontColor = '#030303';

export const themeOptionsDark: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: primaryDarkColor,
      contrastText: darkFontColor,
    },
    secondary: {
      main: '#868d92',
      contrastText: darkFontColor,
    },
    error: {
      main: '#ef6a67',
      contrastText: darkFontColor,
    },
    warning: {
      main: '#f99f1f',
      contrastText: darkFontColor,
    },
    info: {
      main: '#67c5e0',
      contrastText: darkFontColor,
    },
    success: {
      main: '#6fc96f',
      contrastText: darkFontColor,
    },
  },
  typography: {
    fontFamily: 'sans-serif',
    allVariants: {
      color: darkFontColor,
    },
  },
  spacing: 7,
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.className === 'color-picker-search' && {
            '&.Mui-selected': {
              display: 'none',
            },
          }),
        }),
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.className === 'footer-container' && {
            backgroundColor: primaryDarkColor,
          }),
        }),
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: primaryDarkColor,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...((ownerState.className === 'header-btn active' && {
            color: '#343434',
            ':hover': {
              color: '#030303',
              background: 'transparent',
            },
          }) ||
            (ownerState.className === 'header-btn' && {
              ':hover': {
                color: '#cfcfcf',
                background: 'transparent',
              },
            })),
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...((ownerState.className === 'header-btn active' && {
            color: '#343434',
            ':hover': {
              color: '#030303',
            },
          }) ||
            (ownerState.className === 'header-btn' && {
              ':hover': {
                color: '#cfcfcf',
              },
            })),
        }),
      },
    },
  },
};

export const themeOptionsLight: ThemeOptions = {
  ...themeOptionsDark,
  palette: {
    mode: 'light',
    background: {
      paper: '#e3e3e3',
    },
    primary: {
      main: primaryLightColor,
      contrastText: lightFontColor,
    },
    secondary: {
      main: '#e1e1e1',
      contrastText: lightFontColor,
    },
    error: {
      main: '#ffa6a4',
      contrastText: lightFontColor,
    },
    warning: {
      main: '#bb0000',
      contrastText: lightFontColor,
    },
    info: {
      main: '#0073c5',
      contrastText: lightFontColor,
    },
    success: {
      main: '#2d702d',
      contrastText: lightFontColor,
    },
  },

  typography: {
    fontFamily: 'sans-serif',
    allVariants: {
      color: lightFontColor,
    },
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.className === 'color-picker-search' && {
            '&.Mui-selected': {
              display: 'none',
            },
          }),
        }),
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.className === 'footer-container' && {
            backgroundColor: primaryLightColor,
          }),
        }),
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: primaryLightColor,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...((ownerState.className === 'header-btn active' && {
            color: '#fefefe',
            ':hover': {
              color: '#cfcfcf',
              background: 'transparent',
            },
          }) ||
            (ownerState.className === 'header-btn' && {
              ':hover': {
                color: '#cfcfcf',
                background: 'transparent',
              },
            })),
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...((ownerState.className === 'header-btn active' && {
            color: '#fefefe',
            ':hover': {
              color: '#cfcfcf',
            },
          }) ||
            (ownerState.className === 'header-btn' && {
              ':hover': {
                color: '#cfcfcf',
              },
            }) || {
              '&.MuiButton-containedPrimary': {
                ':hover': {
                  backgroundColor: '#7dbf46',
                },
              },
            }),
        }),
      },
    },
  },
};

export const lightTheme = createTheme(themeOptionsLight);
export const darkTheme = createTheme(themeOptionsDark);
