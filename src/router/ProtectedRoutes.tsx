import { ROUTES } from '@/constants/routes';
import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

type Props = {
  isAuth: boolean | null;
};

export const ProtectedRoutes=({isAuth}: Props) => isAuth
  ? <Outlet />
  : <Navigate to={ROUTES.signIn} />;
