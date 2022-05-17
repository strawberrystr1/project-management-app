import { Route, Routes } from 'react-router-dom';
import { useTypedSelector } from '../hooks/redux';
import routes from '../utils/constants/routes';

const Root = () => {
  const { isLogged } = useTypedSelector((state) => state.user);

  return (
    <Routes>
      {routes.public.map((route) => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
      {isLogged &&
        routes.private.map((route) => (
          <Route path={route.path} element={route.element} key={route.path} />
        ))}
    </Routes>
  );
};

export default Root;
