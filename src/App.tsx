import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import Footer from './components/layouts/Footer/';
import Header from './components/layouts/Header/';
import Main from './components/layouts/Main/';
import { useTypedSelector } from './hooks/redux';
import Root from './pages/Root';
import { darkTheme, lightTheme } from './theme/theme';

function App() {
  const { isDarkTheme } = useTypedSelector((state) => state.settings);

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
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
