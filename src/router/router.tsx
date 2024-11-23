/* eslint-disable import/namespace */
import React, {Suspense} from 'react';
import {Navigate, useRoutes} from 'react-router-dom';
import {
  Home
} from './lazy';
import {ProtectedRoutes} from './ProtectedRoutes';
import {PublicRoutes} from './PublicRoutes';
import { ROUTES } from '@/constants/routes';

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
        // element: <Layout />,
        element: <div></div>,
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
    path: ROUTES.signIn,
    element: <PublicRoutes isAuth={isAuth} />,
    children: [
      {
        index: true,
        // element: <Suspense fallback={<div>Loading ....</div>}><Login /></Suspense>,
      },
    ],
  },
]);
