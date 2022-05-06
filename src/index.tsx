import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme/theme';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import './utils/i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Suspense fallback={<CircularProgress />}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  </React.StrictMode>
);
