import Home from '../../pages/home_page/HomePage';
import { Navigate } from 'react-router-dom';
import NotFound from '../../pages/not_found_page/NotFoundPage';
import { IRouterRoutes } from '../../interfaces/baseInterfaces';
import AuthenticationPage from '../../pages/authentication_page';

const routes: IRouterRoutes = {
  public: [
    {
      path: '/home',
      element: <Home />,
    },
    {
      path: '/',
      element: <Navigate to="/home" replace />,
    },
    {
      path: '/sign-up',
      element: <AuthenticationPage />,
    },
    {
      path: '/sign-in',
      element: <AuthenticationPage />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ],
  private: [
    {
      path: '/boards',
      element: <NotFound />,
    },
    {
      path: '/boards/board/:id',
      element: <NotFound />,
    },
    {
      path: '/profile/:id',
      element: <NotFound />,
    },
  ],
};

export default routes;
