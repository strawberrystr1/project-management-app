import { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import Footer from './components/layouts/Footer/';
import Header from './components/layouts/Header/';
import Main from './components/layouts/Main/';
import { useTypedSelector } from './hooks/redux';
import Root from './pages/Root';
import { darkTheme, lightTheme } from './theme/theme';
import { useGetUserMutation } from './store/services/userService';
import jwt from 'jwt-decode';
import { useTypedDispatch } from './hooks/redux';
import { setToken } from './store/reducers/userSlice';
import Loader from './components/Loader';
import { readToken } from './utils/functions';

function App() {
  const dispatch = useTypedDispatch();
  const [getUser] = useGetUserMutation();
  const [load, setLoad] = useState(true);
  const { theme } = useTypedSelector((state) => state.settings);

  const checkToken = async () => {
    try {
      const token = readToken();
      if (token) {
        const { id } = jwt<{ id: string }>(token);
        const res = await getUser(id).unwrap();
        dispatch(setToken({ id: res._id, isLogged: true }));
      }
    } catch (error) {
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (load) return <Loader />;

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <Header />
      <Main>
        <Root />
      </Main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
