import { Loading } from '../components/Loading';
import React, { lazy } from 'react';

const handleCatchChunkError = () => {
  window.location.reload();

  return { default: () => <Loading /> };
};

// Home
export const Home = lazy(() =>
  import('../pages/Home')
    .then(({ Home }) => ({ default: Home }))
    .catch(handleCatchChunkError)
);

// Auth
export const SignUp = lazy(() =>
  import('../pages/Auth')
    .then(({ SignUp }) => ({ default: SignUp }))
    .catch(handleCatchChunkError)
);

export const SignIn = lazy(() =>
  import('../pages/Auth')
    .then(({ SignIn }) => ({ default: SignIn }))
    .catch(handleCatchChunkError)
);
