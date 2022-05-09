import { useEffect } from 'react';
import Footer from './components/layouts/Footer/';
import Header from './components/layouts/Header/';
import Main from './components/layouts/Main/';
import Root from './pages/Root';
import { useGetUserMutation } from './store/services/userService';

function App() {
  const [getUser] = useGetUserMutation();

  useEffect(() => {
    const token = localStorage.getItem('token-rss');
    if (token) {
      getUser(token);
    }
  }, []);

  return (
    <>
      <Header />
      <Main>
        <Root />
      </Main>
      <Footer />
    </>
  );
}

export default App;
