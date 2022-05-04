import { Footer } from './components/layouts/Footer';
import { Header } from './components/layouts/Header';
import { Main } from './components/layouts/Main';
import { Root } from './pages/Root';

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
