import '../styles/global.scss';
import 'react-toastify/dist/ReactToastify.css';

import React, { FC } from 'react';
import { useBootstrap } from './useBootstrap';
import { HashRouter } from 'react-router-dom';
import { Router } from '../router';
import { Loading } from '../components/Loading';
import {observer, Provider} from 'mobx-react';
import { stores } from '../store/stores';
import { ToastContainer } from 'react-toastify';
import { authStore } from '../store/auth';

export const App: FC = observer(() => {
  const [isInitiated] = useBootstrap();

  if (isInitiated) {
    return <Loading />;
  }

  return (
    <Provider {...stores}>
      <HashRouter>
        <Router isAuth={authStore.isAuth} />
        <ToastContainer />
      </HashRouter>
    </Provider>
  );
});
