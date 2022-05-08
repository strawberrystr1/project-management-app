import Footer from './components/layouts/Footer/';
import Header from './components/layouts/Header/';
import Main from './components/layouts/Main/';
import useAuthCheck from './hooks/useAuthCheck';
import Root from './pages/Root';

function App() {
  useAuthCheck();
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
