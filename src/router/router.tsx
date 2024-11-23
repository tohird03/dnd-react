import React, {Suspense} from 'react';
import {Navigate, useRoutes} from 'react-router-dom';
import {
  Home,
  SignIn,
  SignUp,
} from './lazy';
import {ProtectedRoutes} from './ProtectedRoutes';
import {PublicRoutes} from './PublicRoutes';
import { ROUTES } from '../constants/routes';
import { Layout } from '../components/Layout/Layout';

type Props = {
  isAuth: boolean | null;
};

export const Router = ({isAuth}: Props) => useRoutes([
  {
    path: ROUTES.home,
    element: <ProtectedRoutes isAuth={isAuth} />,
    children: [
      {
        path: ROUTES.home,
        element: <Layout />,
        children: [
          {
            element: <Suspense fallback={<div>Loading ...</div>}><Home /></Suspense>,
            path: ROUTES.home,
            index: true,
          },
          // SETTING ROUTES
          {
            element: <Navigate to={ROUTES.home} />,
            path: '*',
          },
          {
            element: <Navigate to={ROUTES.home} />,
            path: '/',
          },
        ],
      },
    ],
  },
  {
    element: <PublicRoutes isAuth={isAuth} />,
    children: [
      {
        index: true,
        path: ROUTES.signUp,
        element: <Suspense fallback={<div>Loading ....</div>}><SignUp /></Suspense>,
      },
      {
        path: ROUTES.signIn,
        element: <Suspense fallback={<div>Loading ....</div>}><SignIn /></Suspense>,
      },
    ],
  },
]);
