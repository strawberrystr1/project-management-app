import Footer from './components/layouts/Footer/Footer';
import Header from './components/layouts/Header/Header';
import Main from './components/layouts/Main/Main';
import Root from './pages/Root';

function App() {
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
