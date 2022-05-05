import { Route, Routes } from 'react-router-dom';
import routes from '../utils/constants/routes';

const Root = () => {
  const isLogged = true; // replace this for state variable

  return (
    <Routes>
      {routes.public.map((route, i) => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
      {isLogged &&
        routes.private.map((route, i) => (
          <Route path={route.path} element={route.element} key={route.path} />
        ))}
    </Routes>
  );
};

export default Root;
