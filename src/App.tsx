import { useEffect, useState } from 'react';
import Footer from './components/layouts/Footer/';
import Header from './components/layouts/Header/';
import Main from './components/layouts/Main/';
import Root from './pages/Root';
import { useGetUserMutation } from './store/services/userService';
import jwt from 'jwt-decode';
import { useTypedDispatch } from './hooks/redux';
import { setToken } from './store/reducers/userSlice';
import Loader from './components/Loader';

function App() {
  const dispatch = useTypedDispatch();
  const [getUser, { data }] = useGetUserMutation();
  const [load, setLoad] = useState(true);

  const checkToken = async () => {
    try {
      const token = localStorage.getItem('token-rss');
      if (token) {
        const { userId } = jwt<{ userId: string }>(token);
        const res = await getUser({ id: userId, token }).unwrap();
        dispatch(setToken({ id: res.id, isLogged: true }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (load) return <Loader />;

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
