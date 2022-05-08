import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { setupStore } from './store/store';
import { Provider } from 'react-redux';
import './index.scss';
import { CircularProgress } from '@mui/material';
import './utils/i18n';

const store = setupStore();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<CircularProgress />}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Suspense>
    </Provider>
  </React.StrictMode>
);
