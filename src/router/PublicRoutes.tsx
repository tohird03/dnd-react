import { ROUTES } from '../constants/routes';
import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

type Props = {
  isAuth: boolean | null;
};

export const PublicRoutes=({isAuth}: Props) => isAuth
  ? <Navigate to={ROUTES.home} />
  : <Outlet />;
