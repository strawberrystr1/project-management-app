import { Home } from '../../pages/home_page';
import { Navigate } from 'react-router-dom';
import { NotFound } from '../../pages/not_found_page';
import { IRouterRoutes } from '../../interfaces/baseInterfaces';

export const routes: IRouterRoutes = {
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
      path: '/sign-in',
      element: <NotFound />,
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
