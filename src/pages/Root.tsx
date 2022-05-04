import { Route, Routes } from 'react-router-dom';
import { routes } from '../utils/constants/routes';

export const Root = () => {
  const isLogged = true; // replace this for state variable

  return (
    <Routes>
      {routes.public.map((route, i) => (
        <Route path={route.path} element={route.element} key={i} />
      ))}
      {isLogged &&
        routes.private.map((route, i) => (
          <Route path={route.path} element={route.element} key={i} />
        ))}
    </Routes>
  );
};
