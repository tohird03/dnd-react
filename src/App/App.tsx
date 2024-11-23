import '../styles/global.scss';

import React, { FC } from 'react';
import { useBootstrap } from './useBootstrap';
import { HashRouter } from 'react-router-dom';
import { Router } from '@/router';

export const App: FC = () => {
  const [isInitiated] = useBootstrap();

  if (isInitiated) {
    return "Loading";
  }

  return (
    <HashRouter>
      <Router isAuth />
    </HashRouter>
  );
};
